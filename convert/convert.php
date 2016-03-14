<?

include('Db.php');

class Convert extends Db {
	private $CSVFile = '../projectdata/Booking af klasser_DNA&LIV_v20160202.csv';
	
	public function __construct() {
		parent::__construct();

		mysql_set_charset('utf8');

		$this->emptyTables();

		if (($handle = fopen($this->CSVFile, "r")) !== false) {
			$this->fieldNames = fgetcsv($handle, 1000, ',');

			echo '<pre>';
			print_r($this->fieldNames);
			echo '</pre>';

			$total=0;
			$count=0;
			
			while (($record = fgetcsv($handle, 1000, ',')) !== false) {
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

				$kf = explode(' ',$array['Klasse']);
				$klassetrin = isset($kf[0]) ? $kf[0] : false;
				$fag = isset($kf[1]) ? $kf[1] : false;

				$SQL='insert into booking_klasse (booking_id, status, adresse, postnr, `by`, kommune, region, institutionsnavn, laererNavn, laererTlf, '.
										'laererEmail, antalElever, antalLaerer, fag, klassetrin, DatoForBesoeg, DatoForBooking, DatoForEkst) values('. 
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
					$this->q($array['DatoForBookning']) .		
					$this->q($array['DatoForEkst'], false) .		

				')';

				echo '<br>'.$SQL.'<br>';
				$this->exec($SQL);
	
				$this->records[]=$array;
				$count++;
			}
		}
	}

	private function statusToNum($status) {
		switch ($status) {
			case 'Bekræftet' :
					return 1; break;
			case 'Aflyst' :
					return -1; break;
			default :
					return 0; break;
		}
	}

	private function emptyTables() {
		$SQL='delete from booking';
		$this->exec($SQL);
		$SQL='delete from booking_klasse';
		$this->exec($SQL);
	}

	private function getBookingId($record) {
		$SQL='select * from booking where sagsNo = "'.$record['SagsNo'].'"';
		$id = $this->getValue($SQL);
		if (!$id) {
			$SQL='insert into booking (sagsNo, aar_periode, periode) values('.
				$this->q($record['SagsNo']) .
				$this->q($record['Aar_periode']) .
				$this->q($record['Periode'], false) .
			')';
			$this->exec($SQL);
			$id = mysql_insert_id();
		}
		return $id;
	}
				
}

$convert = new Convert();

?>
