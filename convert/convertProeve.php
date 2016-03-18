<?

include('Db.php');

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
		$d = explode('/', $date);
		if (count($d)==3) {
			return $d[2].'-'.$d[0].'-'.$d[1];
		} else {
			return false;
		}
	}

	public function run() {
		if (($handle = fopen($this->file, "r")) !== false) {
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

				$ngUl = isset($array['ngUl']) ? $array['ngUl'] : '';

				$SQL='insert into proeve (proeve_nr, Lokalitet, indsamlingsdato, GPS_X, GPS_Y, Lat, `Long` , Analyseret, Indsamler, Mailadresse, '.
											'ProeverModtaget, DatoForEkst, ElueretI, ngUl, AntalKuverter, SNM_Adresse, kommentar, dataset) values('.
					$this->q($array['ProeveID']) .
					$this->q($array['Lokalitet']) .
					$this->q($this->fixDate($array['DatoForIndsamling'])) .
					$this->q($array['GPS_X']) .
					$this->q($array['GPS_Y']) .
					$this->q($array['Lat']) .
					$this->q($array['Lon']) .
					$this->q($this->fixDate($array['Analyseret'])) .
					$this->q($array['Indsamler']) .
					$this->q($array['Mailadresse']) .
					$this->q($this->fixDate($array['ProeverModtaget'])) .
					$this->q($this->fixDate($array['DatoForEkst'])) .
					$this->q($array['ElueretI']) .
					$this->q($ngUl) .
					$this->q($array['AntalKuverter']) .
					$this->q($array['SNM_Adresse']) .
					$this->q($array['Kommentar']) .
					$this->q($this->dataset, false) .
				')';

				echo $SQL.'<br>';

				$this->exec($SQL);
			}
		}
	}

	private function resetTable($table) {
		$SQL='delete from '.$table;
		$this->exec($SQL);
		$SQL='alter table '.$table.' AUTO_INCREMENT = 1';
		$this->exec($SQL);
	}

	public function emptyTables() {
		$this->resetTable('proeve');
	}

				
}

$convert = new ConvertProeve('../projectdata/snm2014.csv', 'SNM2014');
$convert->emptyTables();
$convert->run();

$convert = new ConvertProeve('../projectdata/snm2015.csv', 'SNM2015');
$convert->run();

?>
