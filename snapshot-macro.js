/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 05/10/23
 * 
 * This Webex Device macro launches a web app which takes a snapshot 
 * form the devices camera and sends to a Webex Message to a space. 
 * It domestates how to grant camera access to a website domain and 
 * automatcailly capture a image snapshot using the WebEngines Media APIs.
 *
 * Full Readme, source code and license details available here:
 * https://github.com/wxsd-sales/snapshot-macro
 * 
 ********************************************************/
import xapi from 'xapi';

/*********************************************************
 * Configure the settings below
**********************************************************/

const config = {
  domain: 'wxsd-sales.github.io', // Domain to grant camera access to
  url: 'https://wxsd-sales.github.io/kiosk-demos/webcam', // URL of your web app
  token: '<Webex Bot Token>', // Webex Bot Token
  email: '<Target Webex User Email>', // Target Webex User email to send image to 
  text: 'Here is your webcam capture from device: ', // Text to be included in message
  showPlayer: true, // Should the webapp show the selfview
  button: 
    {
      name: 'Capture Snapshot',   // Snapshot button name
      icon: 'Disc',               // Snapshot button icon
      color: '#148579',           // Snapshot button color
      panelId: 'snapshot-button'  // Snapshot unique panel Id
    }
}

/*******************************************************************************
 * Create Button, enable camera media access and listen for clicks
********************************************************************************/

createPanel(config.button)
xapi.Command.WebEngine.MediaAccess.Add({ Device: ['Camera'], Hostname: config.domain });
xapi.Event.UserInterface.Extensions.Panel.Clicked.on(processClicks);
xapi.Status.UserInterface.WebView.on(processWebViews);

/*******************************************************************************
 * Process Clicks and WebView Changes
********************************************************************************/

let timer;

function processClicks(event) {
  if (!event.PanelId.startsWith(config.button.panelId)) return;
  xapi.Status.UserInterface.ContactInfo.Name.get()
  .then(deviceName => openWebview(deviceName))
}

async function processWebViews(event) {
  if (!event.hasOwnProperty('URL')) return;
  const splitURL = event.URL.split('#')
  if(splitURL.length < 2) return;
  const hash = splitURL.pop();
  if(hash != 'snapshot-complete') return;
  console.log('Snapshot completed detected in URL hash, closing webview')
  clearTimeout(timer)
  closeWebview()
}

function openWebview(deviceName){
  const text = encodeURIComponent(config.text + deviceName)
  const url = `${config.url}?token=${config.token}&email=${config.email}&text=${text}&showPlayer=${config.showPlayer}`
  console.log('Opening webview on OSD')
  xapi.Command.UserInterface.WebView.Display(
    { Mode: 'Fullscreen', Target: 'OSD', Title: 'Webcam Capture', Url: url })
    .then(result => timer = setTimeout(closeWebview, 20000))
}

function closeWebview(){
  console.log('Closing webview on OSD')
  xapi.Command.UserInterface.WebView.Clear({ Target: 'OSD' })
}

function createPanel(button) {
  const panel = `
    <Extensions>
      <Panel>
        <Type>Statusbar</Type>
        <Location>HomeScreen</Location>
        <Icon>${button.icon}</Icon>
        <Color>${button.color}</Color>
        <Name>${button.name}</Name>
        <ActivityType>Custom</ActivityType>
      </Panel>
    </Extensions>`
  xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: button.panelId },
    panel
  )
    .catch(e => console.log('Error saving panel: ' + e.message))
}
