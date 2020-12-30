<?php
 /**
  * Create a Google Calendar "add to calendar" link.
  *
  * This function is convienient because it does not require an API connection.
  * Note that this only allows for adding a single event.
  * The data does not have to exist already on any Google Calendar anywhere.
  * This just adds your event data to the end-users GCal one item at a time.
  * See https://stackoverflow.com/a/19867654/947370 for a full explaination of
  * the Google Calendar URL structure.
  *
  * @author Peter Wise / Square Candy Design
  * @link https://stackoverflow.com/a/19867654/947370
  *
  * @param string    $name          The main title of the event
  * @param string    $startdate     The start date and time in any format that strtotime can digest
  * @param string    $enddate       The end date and time in any format that strtotime can digest
  * @param string    $description   The longer description text of the event
  * @param string    $location      The event location - any text google maps can parse as a single point
  * @param bool      $allday        Is the event "All Day" with no times displayed?
  * @param string    $linktext      The text of the link. Defaults to 'Add to gCal'.
  * @param array     $classes       An array of classes to add to the link element.
  * @return string An HTML link to add the event
  */

   header('Content-Type: application/json');

$aResult = array();

$postArray = $_POST['args'];


  switch($_POST['fName']){
	case 'addToGcal':
			$aResult["result"] = addToGcal((string)$postArray[0], (string)$postArray[1], (string)$postArray[2], (string)$postArray[3], (string)$postArray[4],$postArray[5],(string)$postArray[6], $postArray[7], $postArray[8]);
        break;
    default: 
        break;
  }


function addToGcal(
  $name,
  $startdate,
  $enddate = false,
  $description = false,
  $location = false,
  $allday = false,
  $linktext = 'Set a reminder',
  $classes,
  $id
) {

  // calculate the start and end dates, convert to ISO format
  if ($allday) {
    $startdate = date('Ymd',strtotime($startdate));
  }
  else {
    $startdate = date('Ymd\THis',strtotime($startdate));
  }

  if ($enddate && !empty($enddate) && strlen($enddate) > 2) {
    if ($allday) {
      $enddate = date('Ymd',strtotime($enddate . ' + 1 day'));
    }
    else {
      $enddate = date('Ymd\THis',strtotime($enddate));
    }
  }
  else {
    $enddate = date('Ymd\THis',strtotime($startdate . ' + 2 hours'));
  }

  // build the url
  $url = 'http://www.google.com/calendar/event?action=TEMPLATE';
  $url .= '&text=' . rawurlencode($name);
  $url .= '&dates=' . $startdate . '/' . $enddate;
  if ($description) {
    $url .= '&details=' . rawurlencode($description);
  }
  if ($location) {
    $url .= '&location=' . rawurlencode($location);
  }

  // build the link output
  $output = '<a href="' . $url . '" class="' . $classes . '" id="' . $id .'" >'.$linktext.'</a>';

  json_encode($output);
  return $output;
}