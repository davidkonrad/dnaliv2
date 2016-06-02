<?

include('Db.php');

class Convert extends Db {
	//private $CSVFile = '../projectdata/Booking af klasser_DNA&LIV_v20160202.csv';
	private $CSVFile = '../projectdata/DNA&liv_Bookingliste02.csv';
	
	public function __construct() {
		parent::__construct();

		mysql_set_charset('utf8');
		$this->emptyTables();
		$delimiter = ';';

		if (($handle = fopen($this->CSVFile, "r")) !== false) {
			$this->fieldNames = fgetcsv($handle, 1000, $delimiter);

			echo '<pre>';
			print_r($this->fieldNames);
			echo '</pre>';

			$total=0;
			$count=0;
			
			while (($record = fgetcsv($handle, 1000, $delimiter)) !== false) {
				$array = array();
				$index = 0;

				foreach ($this->fieldNames as $fieldName) {
					$array[$fieldName] = $record[$index];
					$index++;
				}

				echo '<pre>';
				print_r($array);
				echo '</pre>';

				$bookingId = $this->getBookingId($array);
				echo $bookingId.'<br>';

				$pb = explode(' ',$array['Postnummer']);
				$postnr = isset($pb[0]) ? $pb[0] : '';
				$by = isset($pb[1]) ? $pb[1] : '';

				/*
				$kf = explode(' ', $array['Klasse']);
				$klassetrin = isset($kf[0]) ? $kf[0] : false;
				$fag = isset($kf[1]) ? $kf[1] : false;
				*/
				$fagKlassetrin = explode(' ', $array['Klasse']);
				if (count($fagKlassetrin) > 1) {
					$klassetrin = $fagKlassetrin[0];
					$fag = $fagKlassetrin[1];
				} else {
					$klassetrin = '';
					$fag = $fagKlassetrin[0];
				}

				$SQL='insert into klasse (booking_id, status, adresse, postnr, `by`, kommune, region, institutionsnavn, laererNavn, '.
								'laererTlf, laererEmail, antalElever, antalLaerer, fag, klassetrin, DatoForBesoeg, DatoForBooking, DatoForEkst, '.
								'SendtInfoMailTilLaerer, EANBlanket) values('. 

					$this->q($bookingId) .
					$this->q($this->statusToNum($array['Status'])) .
					$this->q($array['Adresse']) .
					$this->q($postnr) .
					$this->q($by) .
					$this->q($array['Kommune']) .
					$this->q($array['Region']) .
					$this->q($array['Institutionsnavn']) .
					$this->q($array['Laerer']) .
					$this->q($array['LaererTlf']) .
					$this->q($array['Mailadresse']) .
					$this->q($array['AntalElever']) .					
					$this->q($array['AntalLaerer']) .
					$this->q($fag) .
					$this->q($klassetrin) .
					$this->q($array['DatoForBesoeg']) .		
					$this->q($array['Bookingdato']) .		
					$this->q(isset($array['DatoForEkst']) ? $array['DatoForEkst'] : '') .
					$this->q(isset($array['SendtInfoMailTilLaerer']) ? $array['SendtInfoMailTilLaerer'] : '') .		
					$this->q($array['EANblanket'], false) .		

				')';

				echo '<br>'.$SQL.'<br>';
				$klasseId = $this->insertQuery($SQL);

				//insert lokalitet
				/*
				$SQL='insert into lokalitet (klasse_id, booking_id, navn, X_GPS, Y_GPS, latitude, longitude) values('.
					$this->q($bookingId) .
					$this->q($klasseId) .
					$this->q($array['Lokalitet']) .
					$this->q($array['X_GPS']) .
					$this->q($array['Y_GPS']) .
					$this->q($array['Latitude']) .
					$this->q($array['Longitude'], false) .
				')';
				*/

				if (isset($array['Lokalitet'])) {
					$SQL='insert into lokalitet (presentationString, X_GPS, latitude, longitude) values('.
						$this->q($array['Lokalitet']) .
						$this->q('KLASSE') .
						$this->q($array['Latitude']) .
						$this->q($array['Longitude'], false) .
					')';
	
					$lokalitet_id = $this->insertQuery($SQL);

					//update klasse with lokalitet_id
					$SQL='update klasse set lokalitet_id='.$lokalitet_id.' where klasse_id='.$klasseId;
					$this->exec($SQL);			
				}

				//insert kommentar
				if ($array['Kommentarer'] != '') {
					$SQL='insert into kommentar (type_id, relation_id, kommentar, created_userName) values('.
						$this->q('2') .  ////2 = kommentar_type klasse
						$this->q($klasseId) .
						$this->q($array['Kommentarer']) .
						$this->q('{ Excel }', false) .
					')';
					$this->exec($SQL);
				}
			}
		}
	}

	private function statusToNum($status) {
		switch (trim($status)) {
			case 'Bekræftet' :
				return 1; break;
			case 'Aflyst' :
				return -1; break;
			default :
				return 0; break;
		}
	}

	private function resetTable($table) {
		$SQL='delete from '.$table;
		$this->exec($SQL);
		$SQL='alter table '.$table.' AUTO_INCREMENT = 1';
		$this->exec($SQL);
	}

	private function emptyTables() {
		$this->resetTable('booking');
		$this->resetTable('klasse');

		$SQL='delete from kommentar where type_id = 2'; //2 = kommentar_type klasse
		$this->exec($SQL);

		$SQL='delete from lokalitet where X_GPS = "KLASSE"'; 
		$this->exec($SQL);
	}

	private function getBookingId($record) {
		$SQL='select * from booking where sagsNo = "'.$record['SagsNo'].'"';
		$id = $this->getValue($SQL);
		if (!$id) {
			$SQL='insert into booking (sagsNo, status, DatoForBooking, DatoForBesoeg, aar_periode, periode) values('.
				$this->q($record['SagsNo']) .
				$this->q($this->statusToNum($record['Status'])) .
				$this->q($record['Bookingdato']) .
				$this->q($record['DatoForBesoeg']) .
				$this->q(isset($record['Aar_periode']) ? $record['Aar_periode'] : '') .
				$this->q(isset($record['Periode']) ? $record['Periode'] : '', false) .
			')';
			$this->exec($SQL);
			$id = mysql_insert_id();
		}
		return $id;
	}
				
}

$convert = new Convert();

?>
