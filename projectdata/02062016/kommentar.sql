-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Vært: localhost
-- Genereringstid: 02. 06 2016 kl. 13:06:49
-- Serverversion: 5.5.47-0ubuntu0.14.04.1-log
-- PHP-version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dnaliv`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `kommentar`
--

CREATE TABLE IF NOT EXISTS `kommentar` (
  `kommentar_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `relation_id` int(11) NOT NULL,
  `kommentar` text NOT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_userName` varchar(50) NOT NULL,
  PRIMARY KEY (`kommentar_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=804 ;

--
-- Data dump for tabellen `kommentar`
--

INSERT INTO `kommentar` (`kommentar_id`, `type_id`, `relation_id`, `kommentar`, `created_timestamp`, `created_userName`) VALUES
(80, 3, 2, 'Skal analyseres 15-01-2016', '2016-05-23 10:55:28', '{ Excel }'),
(81, 3, 4, 'Kan bruges af andre', '2016-05-23 10:55:28', '{ Excel }'),
(82, 3, 5, 'booket 12-05-2016', '2016-05-23 10:55:28', '{ Excel }'),
(83, 3, 6, 'Kan bruges af andre', '2016-05-23 10:55:28', '{ Excel }'),
(84, 3, 7, 'Kan bruges af andre. Anne C. Winther Jørgensen og 2ybi', '2016-05-23 10:55:29', '{ Excel }'),
(85, 3, 8, ' Ole Carsten Pedersen, Kan bruges af andre', '2016-05-23 10:55:29', '{ Excel }'),
(86, 3, 10, 'Niels J Willumsen, , F15_078 15-03-2016', '2016-05-23 10:55:29', '{ Excel }'),
(87, 3, 11, 'Vagn Rasmussen', '2016-05-23 10:55:29', '{ Excel }'),
(88, 3, 12, 'Vagn Rasmussen, evt bruges med holdet fra Allerød 7/4 F15_037', '2016-05-23 10:55:29', '{ Excel }'),
(89, 3, 13, 'Mogens Ellebæk (må bruges af andre)', '2016-05-23 10:55:30', '{ Excel }'),
(90, 3, 15, 'kan bruges af andre', '2016-05-23 10:55:30', '{ Excel }'),
(91, 3, 16, 'Kan bruges af andre', '2016-05-23 10:55:30', '{ Excel }'),
(92, 3, 17, 'Kan bruges af andre', '2016-05-23 10:55:30', '{ Excel }'),
(93, 3, 22, 'Prøven hed tidligere DL_F15_063, men blev flytte da den ikke nåede at blive ekstraheret før klassens besøg.', '2016-05-23 10:55:31', '{ Excel }'),
(94, 3, 30, 'Clara/Frederikke/Mehrshrshad', '2016-05-23 10:55:32', '{ Excel }'),
(95, 3, 53, 'Kun 50ml vand igennem filter', '2016-05-23 10:55:35', '{ Excel }'),
(96, 3, 78, 'Prøven er modtaget i juli, hvor der ikke var booket. ', '2016-05-23 10:55:38', '{ Excel }'),
(97, 3, 157, 'Prøver indsamles i uge 36 og sendes straks derefter.', '2016-05-23 10:55:50', '{ Excel }'),
(98, 3, 196, 'Stør', '2016-05-23 10:55:57', '{ Excel }'),
(99, 3, 203, 'Frøer', '2016-05-23 10:55:58', '{ Excel }'),
(100, 3, 247, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:04', '{ Excel }'),
(101, 3, 248, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:04', '{ Excel }'),
(102, 3, 249, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:04', '{ Excel }'),
(103, 3, 250, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:04', '{ Excel }'),
(104, 3, 251, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-23 10:56:05', '{ Excel }'),
(105, 3, 252, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-23 10:56:05', '{ Excel }'),
(106, 3, 253, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:05', '{ Excel }'),
(107, 3, 254, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:05', '{ Excel }'),
(108, 3, 255, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:05', '{ Excel }'),
(109, 3, 256, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:06', '{ Excel }'),
(110, 3, 257, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:06', '{ Excel }'),
(111, 3, 258, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:06', '{ Excel }'),
(112, 3, 259, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:06', '{ Excel }'),
(113, 3, 260, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:06', '{ Excel }'),
(114, 3, 261, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:07', '{ Excel }'),
(115, 3, 262, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:07', '{ Excel }'),
(116, 3, 263, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:07', '{ Excel }'),
(117, 3, 264, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:07', '{ Excel }'),
(118, 3, 265, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:07', '{ Excel }'),
(119, 3, 266, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:07', '{ Excel }'),
(120, 3, 267, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:08', '{ Excel }'),
(121, 3, 268, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:08', '{ Excel }'),
(122, 3, 269, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:08', '{ Excel }'),
(123, 3, 270, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:08', '{ Excel }'),
(124, 3, 271, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:08', '{ Excel }'),
(125, 3, 272, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-23 10:56:09', '{ Excel }'),
(126, 3, 273, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-23 10:56:09', '{ Excel }'),
(127, 3, 274, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-23 10:56:09', '{ Excel }'),
(128, 3, 276, '500 ml gennem sterivex filter, til sammenligning med DL_SNM_2014_0002', '2016-05-23 10:56:09', '{ Excel }'),
(129, 3, 321, 'Der er to ens prøver. Prøven er leveret af en lærer i en spand og kørt igennem filteret af Mette', '2016-05-23 10:56:15', '{ Excel }'),
(130, 3, 322, 'Der er to ens prøver. Prøven er leveret af en lærer i en spand og kørt igennem filteret af Mette', '2016-05-23 10:56:15', '{ Excel }'),
(131, 3, 330, 'Næsten tom', '2016-05-23 10:56:16', '{ Excel }'),
(720, 2, 14, 'Én elev gennemgår en stor operation i ryggen 1-2 mdr inden besøget og må forventes at få lidt lang snor mht evnen til at sidde på en stol osv.', '2016-06-02 10:57:22', '{ Excel }'),
(721, 2, 19, 'Det er en dygtig klasse.', '2016-06-02 10:57:22', '{ Excel }'),
(722, 2, 23, 'Almindelig ''Papegøjeklasse'' med sproglige elever', '2016-06-02 10:57:23', '{ Excel }'),
(723, 2, 24, 'Det er et hold fra læreruddannelsen, der har biologi som undervisningsfag. Tager kontakt pr. mail. Vigtigt for mig at få reserveret dagen i første omgang', '2016-06-02 10:57:23', '{ Excel }'),
(724, 2, 27, 'Jeg har fået et vandopsamlingssæt udleveret på Big Bang konferencen. Jeg sender noget vand ind i slutningen af april.', '2016-06-02 10:57:23', '{ Excel }'),
(725, 2, 39, 'Evt DL_GYM_003, tidligere booking 15-9', '2016-06-02 10:57:24', '{ Excel }'),
(726, 2, 41, 'Klassen har biologi på B-niveau.', '2016-06-02 10:57:24', '{ Excel }'),
(727, 2, 44, 'Der er en hørehæmmet elev i klassen, så der vil evt. være en tolk med. Jeg har haft sendt en tilmelding før sommerferien, som jeg afbestilte igen. Jeg fik tilsendt prøverør mv. inden jeg fik afbestilt. Så hvis vi skal indsamle vandprøve, har jeg fået et kit. Vi skal rejse retur til Vejle fredag eftermiddag med DSB frirejse. Jeg har endnu ikke fået billetterne. Er der mulighed for, at vi kan starte lidt tidligere, hvis det bliver vanskeligt at få det til at hænge sammen med vores hjemrejse?', '2016-06-02 10:57:24', '{ Excel }'),
(728, 2, 46, 'Jeg har booket en dato den 10. december som jeg gerne vil aflyse, men jeg har i den forbindelse allerede modtaget et indsamlingskit. Mange hilsner Katrine', '2016-06-02 10:57:25', '{ Excel }'),
(729, 2, 48, 'Jeg skal nok have gennemgået alt det faglige relevante for klassen inden besøget. Vh Bo', '2016-06-02 10:57:25', '{ Excel }'),
(730, 2, 50, 'Det bliver en studieretningsklasse med Biologi på A-niveau, og matenmatik på A og kemi på B. Klassen er ikke dannet endnu. Det sker først efter nytår, så derfor kan jeg ikke angive antal elever præcist, men det bliver sikkert en hel klasse. ', '2016-06-02 10:57:25', '{ Excel }'),
(731, 2, 52, 'Eleverne har Biologi A i studieretningen. Der er to udvekslingsstudenter (en fra USA og en fra Argentina)', '2016-06-02 10:57:25', '{ Excel }'),
(732, 2, 53, 'Biologi A, KemiB sk´tudieretning._x000D_Da vi kommer med tog fra Helsinge vil vi gerne starte 9.15 hvis det er muligt ', '2016-06-02 10:57:25', '{ Excel }'),
(733, 2, 55, 'Hej Jeg var med stor succes hos jer med min gymnasieklasse i 3 g. Med denne klasse har jeg så ikke endnu nået at tage vandprøver- men det kan måske godt nås i april? Vi vil dog så finde en anden prøvestation, da vi kun fandt lille vandsalamander i Kulsbjerg-søen. mvhJeppe Mordhorst', '2016-06-02 10:57:25', '{ Excel }'),
(734, 2, 56, 'Tidligere booking 15-9', '2016-06-02 10:57:25', '{ Excel }'),
(735, 2, 57, 'Vi vil gerne sende vandprøver fra forskellige lokaliteter fra Halleby Å systemet, hvor vi håber på at finde DNA fra f.eks. odder samt smerling. Det kunne virkeligt være fedt hvis vi kunne isolere DNA fra ørred også. Den har jo enorm kommerciel værdi og kortlægning af denne kunne anvendes ift Fishing Zealand projektet.', '2016-06-02 10:57:25', '{ Excel }'),
(736, 2, 61, 'Vi vil gerne tage egne vandprøver i sensommeren. Hvis muligt send venligst info', '2016-06-02 10:57:26', '{ Excel }'),
(737, 2, 78, 'vi vil gerne tage vandprøven i sensommeren, så send venligst materiale på forhånd', '2016-06-02 10:57:27', '{ Excel }'),
(738, 2, 89, 'Holdet er et hf-enkeltfagshold på B-niveau - Altså vokse kursister!', '2016-06-02 10:57:28', '{ Excel }'),
(739, 2, 97, 'Booket sammen med Heidi Nystrand. Oprindelig sagsnr. F14-01', '2016-06-02 10:57:29', '{ Excel }'),
(740, 2, 103, 'bio b.', '2016-06-02 10:57:29', '{ Excel }'),
(741, 2, 108, '1 ekstra hold på 18 elever fra samme gym er tilmeldt. Booking ændret d. 14. august 2014', '2016-06-02 10:57:30', '{ Excel }'),
(742, 2, 109, '1 ekstra hold på 18 elever fra samme gym er tilmeldt. Booking ændret d. 14. august 2014', '2016-06-02 10:57:30', '{ Excel }'),
(743, 2, 117, 'Ombooket, læreren HAR modtaget indsamlingskit, men pgha efterårsferie ændrede han datoen', '2016-06-02 10:57:30', '{ Excel }'),
(744, 2, 118, 'Vi har to A niveau hold med 2g med 8 elever og 3g med 25 elever', '2016-06-02 10:57:31', '{ Excel }'),
(745, 2, 130, 'Klassen har biologi på B-niveau', '2016-06-02 10:57:32', '{ Excel }'),
(746, 2, 134, 'Biologi studieretning A niveau', '2016-06-02 10:57:33', '{ Excel }'),
(747, 2, 135, 'Klassen er 3y BI.', '2016-06-02 10:57:33', '{ Excel }'),
(748, 2, 137, 'Henvisning til sag F14-13 Vi havde ikke skrevet den korrekte dato i vores kalender. Vi har desuden en elev, der er nyligt rygopereret, som nok ikke kan sidde ned så længe af gangen. Bare så der er forståelse for, at hun evt. går rundt, ligger ned eller lignende', '2016-06-02 10:57:33', '{ Excel }'),
(749, 2, 141, '2 hold. Det ene hold 2g (9 elever) det andet hold 3g (11 elever). Begge hold på A-niveau. ', '2016-06-02 10:57:33', '{ Excel }'),
(750, 2, 145, 'Det er et hold der kommer ind Det er mange elever, men de er meget rolige', '2016-06-02 10:57:34', '{ Excel }'),
(751, 2, 146, 'Det er et hold der kommer ind Det er mange elever, men de er meget rolige', '2016-06-02 10:57:34', '{ Excel }'),
(752, 2, 148, 'Vi kommer med 2 klasser, en biotek A på 11 elever og en Biologi C på 19 elever. Jeg er lærer for dem begge og vil sørge for at de har hørt om DNA og PCR forinden. 1 elev er kørestolsbruger, som har en medhjælper med.', '2016-06-02 10:57:34', '{ Excel }'),
(753, 2, 150, 'OBS: to klasser fra to forskellige gymnasier. De skal have tilsendt to kits. Det ene til Køge, det andet til Tine Tønnes Sørensen Høng Gymnasium og HF Hovedgaden 24270 Høng', '2016-06-02 10:57:34', '{ Excel }'),
(754, 2, 153, 'Vi har haft en del datobytningsforvirring, som også har involveret parallelholdet i biologi med Maria Steinhausen - også fra Helsingør Gymnasium. Det betyder ikke så meget, udover at jeg gerne vil bemærke, at vores prøver er de, som er taget fra "Politisøen" i Helsingør. Så lad ikke booking-koden forlede Jer til at tro, at vi skal behandle Maria Steinhausens prøver :-) hilsen OLe Carsten Pedersen', '2016-06-02 10:57:34', '{ Excel }'),
(755, 2, 167, 'Holdet jeg tænker på er 2g Biologi B , der er 12 elever. Imidlertid kunne jeg tænke mig også at deltage samtidigt med 12 Biologi A-elever . Begge dele kræver imidlertid godkendelse fra skolen som jeg straks vil forespørge om Dvs jeg ønsker at reservere dagen. Skulle dagen være optaget vil torsdag d 3 eller fre d 4-9 / uge 36 også være interessant mvh bente bregnbak.', '2016-06-02 10:57:35', '{ Excel }'),
(756, 2, 172, 'Klassen er på en naturvidenskabelig studieretning med Bio A, kemi B og Mat B og er generelt både dygtige og ambitiøse udi det naturvidenskabelige så bare fyld på:-)', '2016-06-02 10:57:36', '{ Excel }'),
(757, 2, 173, 'Klassen er på en naturvidenskabelig studieretning med Bio A, kemi B og Mat B og er generelt både dygtige og ambitiøse udi det naturvidenskabelige så bare fyld på:-)', '2016-06-02 10:57:36', '{ Excel }'),
(758, 2, 175, 'Jeg kender ikke klassens størrelse endnu', '2016-06-02 10:57:36', '{ Excel }'),
(759, 2, 176, 'Jeg kender ikke klassens størrelse endnu', '2016-06-02 10:57:36', '{ Excel }'),
(760, 2, 177, 'Den anden lærer er kemilærer i bioteknologi, og hedder Jens Sveistrup', '2016-06-02 10:57:36', '{ Excel }'),
(761, 2, 186, 'Klassen har i april underøgt søens kvalitet ved undersøgelse af plante- og dyreliv, iltmåling, BI5, sigtdybde mm Undersøgelsen er del af et løbende samarbejde mellem Allerød Gymnasium og Grundejerforeningen omkring søen, som glæder sig til at høre resultatet af eDNA analyserne', '2016-06-02 10:57:37', '{ Excel }'),
(762, 2, 190, 'Incl 8 elever fra Aurehøj', '2016-06-02 10:57:37', '{ Excel }'),
(763, 2, 196, 'Aftalt starttidspunkt 9.30 (ved Andreas)', '2016-06-02 10:57:37', '{ Excel }'),
(764, 2, 197, '1 hørehæmmet elev. Evt. følger tolk med', '2016-06-02 10:57:37', '{ Excel }'),
(765, 2, 198, 'biologi B niveau Vi indsamler DNA i august, har et prøvesæt!', '2016-06-02 10:57:38', '{ Excel }'),
(766, 2, 206, 'Bekræftet', '2016-06-02 10:57:38', '{ Excel }'),
(767, 2, 207, 'Dette er et IB biologi hold og de skal meget gerne undervises på engelsk; material behøver ikke at være på engelsk, da alle har modtaget undervisning i sporget dansk.', '2016-06-02 10:57:38', '{ Excel }'),
(768, 2, 209, 'Vi har tidligere booket en forløb, men måtte aflyse, og har derfor genbooket._x000D_ Vi har indsendt vandprøver. Det oprindelige bookingnummer var F14-85.', '2016-06-02 10:57:38', '{ Excel }'),
(769, 2, 211, 'Klassen har biologi på A-niveau', '2016-06-02 10:57:39', '{ Excel }'),
(770, 2, 212, 'Klassen har biologi på A-niveau', '2016-06-02 10:57:39', '{ Excel }'),
(771, 2, 213, 'Dagen er booket som en del af et projekt vi kalder "Superbiologer". Eleverne kommer fra 8 forskellige 1. hf klasser - og de har meldt sig frivilligt til arrangementet. Da eleverne kommer fra 8 forskellige klasser (med forskellige lærere) har de ikke haft en fælles introduktion til dagen. Alle eleverne kender til cellers opbygning, DNA''s opbygning og har lavet forsøg med elektroforese. De har biologi på C-niveau._x000D__x000D_Inden sommerferien sendte jeg vandprøver til jer._x000D__x000D_ Mvh Helle ', '2016-06-02 10:57:39', '{ Excel }'),
(772, 2, 217, 'Der er tale om to studieretninger: Biologi og bioteknologi', '2016-06-02 10:57:39', '{ Excel }'),
(773, 2, 218, 'Biologi A', '2016-06-02 10:57:39', '{ Excel }'),
(774, 2, 219, 'Biologi A', '2016-06-02 10:57:39', '{ Excel }'),
(775, 2, 222, 'Vi har i foråret indsamlet og indsendt prøve fra vores lokalområde, Kulsbjerg - og det håber vi jo meget at vi selv kan komme til at analysere!', '2016-06-02 10:57:39', '{ Excel }'),
(776, 2, 225, 'Gymnasietjenesten/BEKL: Oprindeligt forløb den 13/11-2015 rykket til 24/2 efter henvendelse fra lærer. Lærers bemærkninger 12/10-2015: ”Klassen har biologi på B-niveau. Vi har taget vandprøve fra Schweizersøen i Frederiksberg Have, som vi sendte til jer den 30/9. På den er vores besøgsdato markeret som 13/11. Vi mangler endnu at tage prøven fra gymnasiets postevand', '2016-06-02 10:57:40', '{ Excel }'),
(777, 2, 234, 'Har ej indsendt prøver (men prøve indsendt af Vagn Rasmussen, Allerød; DL_GYM_010 /Marie)', '2016-06-02 10:57:40', '{ Excel }'),
(778, 2, 235, 'Meget gerne det forløb om livet i drikkevand, da det passer bedre til hvad klassen har om for tiden, som netop er bakterier i vores omgivelser, og som organisme', '2016-06-02 10:57:40', '{ Excel }'),
(779, 2, 236, 'Forløbet kommer til at afslutte et forløb om økologi, samt være opsummering på teori om evolution, DNAreplikation og proteinsyntese.', '2016-06-02 10:57:40', '{ Excel }'),
(780, 2, 237, 'Jeg har rettet denne booking til d. 10/3 fra en tidligere booking d. 3/3 - efter mailhenvendelse fra læreren. /Mia 17/11', '2016-06-02 10:57:41', '{ Excel }'),
(781, 2, 238, 'Klassen har biologi på B-niveau', '2016-06-02 10:57:41', '{ Excel }'),
(782, 2, 239, 'Vi glæder os.   Vh.  Peter Jensen. ', '2016-06-02 10:57:41', '{ Excel }'),
(783, 2, 243, 'den med ferskvandsdyr i søer (Furesøen): livet i et snapseglas', '2016-06-02 10:57:41', '{ Excel }'),
(784, 2, 245, 'Klassen har den basale viden om genetik inden besøget.', '2016-06-02 10:57:41', '{ Excel }'),
(785, 2, 246, 'Det er en 1g-klasse med studieretning med biologi på A-niveau. ', '2016-06-02 10:57:42', '{ Excel }'),
(786, 2, 248, 'Klassen kender de grundlæggende DNA-teknikker.  ', '2016-06-02 10:57:42', '{ Excel }'),
(787, 2, 252, 'Biologi B', '2016-06-02 10:57:43', '{ Excel }'),
(788, 2, 254, 'Prøven er ændret til DL_GYM_019 og står under fanen "tilsendt fra GYM"', '2016-06-02 10:57:43', '{ Excel }'),
(789, 2, 256, 'En Team Danmark klasse som har morgentræning denne dag, så hvis øvelsesstarten kan rykkes til kl. 9.30- 9.45 vil det være fint.', '2016-06-02 10:57:43', '{ Excel }'),
(790, 2, 261, 'Ombooket, fra F15-018. Vi vil gerne se på prøver fra Bølle Sø eller Avn Sø, prøver er sendt ind fra Gorm Clausen DL_F15-018_2', '2016-06-02 10:57:44', '{ Excel }'),
(791, 2, 262, 'Eleverne er en masterclass i biologi og bioteknologi, hvor eleverne kommer fra Silkeborg, Svendborg og Næstved Gymnasium. De er dygtige og vil gerne udfordres. Hvis I har et ekstra fagligt gear må I gerne bruge det.', '2016-06-02 10:57:44', '{ Excel }'),
(792, 2, 263, 'Eleverne er en masterclass i biologi og bioteknologi, hvor eleverne kommer fra Silkeborg, Svendborg og Næstved Gymnasium. De er dygtige og vil gerne udfordres. Hvis I har et ekstra fagligt gear må I gerne bruge det.', '2016-06-02 10:57:44', '{ Excel }'),
(793, 2, 264, 'Eleverne er en masterclass i biologi og bioteknologi, hvor eleverne kommer fra Silkeborg, Svendborg og Næstved Gymnasium. De er dygtige og vil gerne udfordres. Hvis I har et ekstra fagligt gear må I gerne bruge det.', '2016-06-02 10:57:44', '{ Excel }'),
(794, 2, 266, 'Jeg skal nok have gennemgået alt det faglige relevante for klassen inden besøget. Vh Bo', '2016-06-02 10:57:44', '{ Excel }'),
(795, 2, 268, 'Der er tale om et valgfag Biologi på B-niveau. Der er enkelte kursister som er 1. års elever. Da valgfaget netop er startet op (januar 2016) er kursisttallet forbundet med en smule usikkerhed. På nuværende tidspunkt er der tilmeldt 32 til holdet. Er det i orden at give et kursisttal per 1. marts 2016?', '2016-06-02 10:57:44', '{ Excel }'),
(796, 2, 269, 'Klassen er en international IB klasse, så det normale undervisnings sprog for dem er engelsk, men de fleste forstår noget dansk. Så ligesom sidst vi var på besøg kunne det være fantastisk med samme material (på dansk) men selve underviningen på engelsk? mvh, Christina', '2016-06-02 10:57:44', '{ Excel }'),
(797, 2, 270, 'OBS! Prøve: DL_GYM_008, indsamlet d. 7.6.2015 af Niels J. Willumsen. To hold: 3.g biotek 19 elever, 3.g biologi 11 elever', '2016-06-02 10:57:44', '{ Excel }'),
(798, 2, 271, 'Dette er en IB klasse og vi vil værdsætte det voldsomt, hvis det kan lade sig gøre at gennemføre det meste af dagen på engelsk :o)', '2016-06-02 10:57:45', '{ Excel }'),
(799, 2, 273, 'Dette er en ombookning. Oprindeligt skulle vi komme d. 28.1, så blev det d. 22.1 og nu altså den 21.1. Vores oprindelige bookingnummer DL_F14-96 Vi har indsendt prøver både fra en sø og fra vandhanevand.', '2016-06-02 10:57:45', '{ Excel }'),
(800, 2, 275, 'Klassen har biologi på C-niveau. De går på en naturvidenskabelig studieretning, og det er generelt en dygtig klasse', '2016-06-02 10:57:45', '{ Excel }'),
(801, 2, 277, 'Hej Jeg var med stor succes hos jer med min gymnasieklasse i 3 g. Med denne klasse har jeg så ikke endnu nået at tage vandprøver- men det kan måske godt nås i april? Vi vil dog så finde en anden prøvestation, da vi kun fandt lille vandsalamander i Kulsbjerg-søen. mvh Jeppe Mordhorst', '2016-06-02 10:57:45', '{ Excel }'),
(802, 2, 281, 'Vi henter prøverne den 12/5 og sender dem på dagen eller dagen efter', '2016-06-02 10:57:45', '{ Excel }'),
(803, 2, 286, 'Vi er 32 elever, kan det ikke lade sig gøre alligevel? Mange venlige hilsner Helle Stenz ', '2016-06-02 10:57:46', '{ Excel }');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
