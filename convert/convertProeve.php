<?

include('Db.php');

$created_userName = '{ Excel }';

class ConvertProeve extends Db {
	private $file = '';
	private $dataset = '';
	
	public function __construct($file, $dataset) {
		parent::__construct();

		$this->file = $file;
		$this->dataset = $dataset;

		mysql_set_charset('utf8');
  }

	private function fixDate($date) {
		$date = str_replace(array('/', '.'), '-', $date);
		$d = explode('-', $date);

		if (count($d) > 1) {
			if (strlen($d[0]) == 4) {
				$fix = 	$d[0].'-'.$d[1].'-'.$d[2];
			} else {
				$fix = 	$d[2].'-'.$d[0].'-'.$d[1];
			}
		} else {
			$fix = '';
			echo 'FAILED : '.$date.' -> '.$fix.'<br>';
		}
		echo 'OK : '.$date.' -> '.$fix.'<br>';

		return $fix;
		/*
		echo 'strtotime ('.$date.') : '.strtotime($date).'<br>';

		$time = date('Y-m-d', strtotime($date));

		echo $date.'->'.$time.'<br>';
		return $time;

		/*
		if (trim($date) == '') return '';
		$char = strpos('/', $date) !== false ? '-' : '/';
		echo 'CHAR: '.$char.' -> '.$date.'<br>';
		$d = explode($char, $date);
		echo '<br>';
		print_r($d);
		if (count($d)==3) {
			echo 'RETURN: '.$date.' -> '.$d[2].'-'.$d[0].'-'.$d[1].'<br>';
			return $d[2].'-'.$d[0].'-'.$d[1];
		} else {
			return false;
		}
		*/
	}

	public function run() {
		global $created_userName;

		if (($handle = fopen($this->file, "r")) !== false) {
			$this->fieldNames = fgetcsv($handle, 1000, ';');

			echo '<pre>';
			print_r($this->fieldNames);
			echo '</pre>';

			$total=0;
			$count=0;
			
			while (($record = fgetcsv($handle, 1000, ';')) !== false) {
				$array = array();
				$index = 0;

				foreach ($this->fieldNames as $fieldName) {
					$array[$fieldName] = $record[$index];
					$index++;
				}

				echo '<pre>';
				print_r($array);
				echo '</pre>';

				//insert lokalitet
				$SQL='insert into lokalitet (presentationString, X_GPS, Y_GPS, latitude, longitude) values('.
					$this->q($array['Lokalitet']) .					
					$this->q($array['X_GPS']) .
					$this->q($array['Y_GPS']) .
					$this->q(trim($array['Latitude'])) .
					$this->q(trim($array['Longitude']), false) .
				')';
				$lokalitet_id = $this->insertQuery($SQL);

				//insert proeve			
				$SQL='insert into proeve (proeve_nr, lokalitet_id, indsamlingsdato, Analyseret, Indsamler, Mailadresse, '.
											'ProeverModtaget, Institutionsnavn, DatoForEkst, ElueretI, ngUl, AntalKuverter, 
											SNM_Adresse, created_userName, dataset) values('.

					$this->q($array['Proevenummer']) .
					$this->q($lokalitet_id) .
					$this->q($this->fixDate($array['DatoForIndsamling'])) .
					//$this->q($array['DatoForIndsamling']) .
					$this->q($this->fixDate($array['Analysedato'])) .
					$this->q($array['Indsamler']) .
					$this->q($array['Mailadresse']) .
					$this->q($this->fixDate($array['ProeverModtaget'])) .
					//$this->q($array['ProeverModtaget']) .
					$this->q($array['Institutionsnavn']) .
					$this->q($this->fixDate($array['DatoForEkst'])) .
					//$this->q($array['DatoForEkst']) .
					$this->q($array['ElueretI']) .
					$this->q($array['ngUl']) .
					$this->q('') .
					$this->q('') .
					$this->q($created_userName) .
					$this->q($array['Dataset'], false) .
				')';

				echo $SQL.'<br>';

				$proeve_id = $this->insertQuery($SQL);

				//insert note
				if (trim($array['Note']) != '') {
					$SQL = 'insert into kommentar (type_id, relation_id, kommentar, created_userName) values('.
						$this->q(3) . //kommentar_type proeve
						$this->q($proeve_id) .
						$this->q($array['Note']) .
						$this->q($created_userName, false)  .
					')';
					$this->query($SQL);
				}
								
			}
		}
	}

	private function resetKommentarer($table) {
		$SQL='delete from kommentar where type_id = 3';
		$this->exec($SQL);
	}

	private function resetTable($table) {
		$SQL='delete from '.$table;
		$this->exec($SQL);
		$SQL='alter table '.$table.' AUTO_INCREMENT = 1';
		$this->exec($SQL);
	}

	public function emptyTables() {
		//$this->resetTable('proeve');
		//$this->resetTable('lokalitet');
		//$this->resetTable('lokalitet_spot');
		//$this->resetKommentarer();
	}

				
}
/*
$convert = new ConvertProeve('../projectdata/snm2014.csv', 'SNM2014');
$convert->emptyTables();
$convert->run();

$convert = new ConvertProeve('../projectdata/snm2015.csv', 'SNM2015');
$convert->run();
*/

/*
$convert = new ConvertProeve('../projectdata/DNA&liv_Prøveliste02.csv', '');
$convert->emptyTables();
$convert->run();
*/

$convert = new ConvertProeve('../projectdata/DNA&liv_Prøveliste03.csv', '');
$convert->emptyTables();
$convert->run();

?>
