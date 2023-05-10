# Snapshot Macro
This Webex Device macro launches a web app which takes a snapshot form the devices camera and sends to a Webex Message to a space. It demonstrates  how to grant camera access to a website domain and automatically  capture a image snapshot using the WebEngines Media APIs.

### Captured from the device
![image](https://github.com/wxsd-sales/snapshot-macro/assets/21026209/9b0bf3f0-28f2-4f75-bb39-54a58b1dab56)

### Sent as a Webex Message
<img width="426" alt="image" src="https://github.com/wxsd-sales/snapshot-macro/assets/21026209/7d3c69e3-d5bc-4cbc-9f4d-94adfafb6b18">

## Overview

Webex Devices with WebEngine support can be configured to automatically grant Camera and Microphone access to a website that requests it. Using this xAPI command for example will grant Camera access to ``example.com``:

```ssh
xCommand WebEngine MediaAccess Add Device: Camera Hostname: example.com
```
Creating a Web App which gets the Camera media device official Web APIs is then simple and requires no user permission. Therefore in this particular example we launch a Web App which gets the camera media and then captures a snapshot which it then sends it as a file attachment to a Webex user using a Bot Token and the Webex Create message APIs.


### Flow Diagram


![image](https://github.com/wxsd-sales/snapshot-macro/assets/21026209/c0a3875e-5849-4e35-a95d-d4d85cbf2c82)


## Setup

### Prerequisites & Dependencies: 

- RoomOS/CE 11.2.x or above Webex Device.
- Web admin access to the device to upload the macro.
- Webex Bot Access token to send the image as a Webex Message


### Installation Steps:
1. Download the ``snapshot-macro.js`` file and upload it to your Webex Room device via Macro editor available on its web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.
    
## Validation

Validated Hardware:

* Room Kit Pro + Touch 10
* Desk Pro

This macro should work on other Webex Devices but has not been validated at this time.
    
## Demo

<!-- Keep the following statement -->
*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License
All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer
Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=snapshot-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
