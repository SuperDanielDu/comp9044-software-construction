/**
* hbStandard javascript library
*
* 
*
* @author Dan Callaghan
* @version 0.0.1
* @package UNSW Handbook
**/

/**
 * Makes the search input display the word Search when not being used
 *
 * @return void
 **/
function hbSearchDisplay(f, searchString)
{
	if (f.value == searchString) {
		f.value = '';
	} else if (f.value == '') {
		f.value = searchString;
	}
}

/**
 * Handles toggling of dropdown elements
 *
 * @return void
 **/
function hbToggleDropdown(element, dropdownElement)
{
	var parent = element.parentNode;
	if (parent.className == 'on') {
		if (window.opera || navigator.vendor == 'iCab') {
			$(dropdownElement).style.display = 'none';
			parent.className = '';
			element.getElementsByTagName('img')[0].src = '/images/hbImages/hbToggleIconOpen.png';
		} else {
			new Effect.BlindUp(
				dropdownElement, 
				{
					duration:0.2,
					afterFinish:function ()
					{
						parent.className = '';
						element.getElementsByTagName('img')[0].src = '/images/hbImages/hbToggleIconOpen.png';
					}
				}
			);
		}
		/*t.title = o;*/
	} else {
		if (window.opera || navigator.vendor == 'iCab') {
			$(dropdownElement).style.display = 'block';
			parent.className = 'on';
			element.getElementsByTagName('img')[0].src = '/images/hbImages/hbToggleIconClose.png';
		} else {
			new Effect.BlindDown(
				dropdownElement, 
				{
					duration:0.2,
					beforeStart:function ()
					{
						parent.className = 'on';
						element.getElementsByTagName('img')[0].src = '/images/hbImages/hbToggleIconClose.png';
					}
				}
			);
		}
		/*t.title = c;*/
	}
}