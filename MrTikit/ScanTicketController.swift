//
//  ScanTicketController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/28/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON
import AVFoundation

class ScanTicketController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {
    @IBOutlet var qrView : UIView!
    @IBOutlet var scannBtn : UIButton!
    @IBOutlet var ticketName: UILabel!
    @IBOutlet var ticketSection: UILabel!
    @IBOutlet var successImage: UIImageView!
    @IBOutlet var failImage: UIImageView!
    
    var captureSession: AVCaptureSession!
    var previewLayer: AVCaptureVideoPreviewLayer!
    var myEvent: String!
    var loginKey: String!
    
    var isScanning:Bool = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.ticketName.text = ""
        self.ticketSection.text = ""
        scannBtn.hidden = true
        
        successImage.image = successImage.image!.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate)
        failImage.image = failImage.image!.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate)
    }
    
    override func viewDidLayoutSubviews() {
        captureSession = AVCaptureSession()
        
        let videoCaptureDevice = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
        let videoInput: AVCaptureDeviceInput
        
        do {
            videoInput = try AVCaptureDeviceInput(device: videoCaptureDevice)
        } catch {
            return
        }
        
        if (captureSession.canAddInput(videoInput)) {
            captureSession.addInput(videoInput)
        } else {
            failed();
            return;
        }
        
        let metadataOutput = AVCaptureMetadataOutput()
        
        if (captureSession.canAddOutput(metadataOutput)) {
            captureSession.addOutput(metadataOutput)
            
            metadataOutput.setMetadataObjectsDelegate(self, queue: dispatch_get_main_queue())
            metadataOutput.metadataObjectTypes = [AVMetadataObjectTypeQRCode]
        } else {
            failed()
            return
        }
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = qrView.layer.bounds
        previewLayer.videoGravity = AVLayerVideoGravityResize;
        qrView.layer.addSublayer(previewLayer);
        
        captureSession.startRunning()
    }
    
    func failed() {
        let ac = UIAlertController(title: "Scanning not supported", message: "Your device does not support scanning a code from an item. Please use a device with a camera.", preferredStyle: .Alert)
        ac.addAction(UIAlertAction(title: "OK", style: .Default, handler: nil))
        presentViewController(ac, animated: true, completion: nil)
        captureSession = nil
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        
        if (captureSession?.running == false) {
            captureSession.startRunning();
        }
    }
    
    override func viewWillDisappear(animated: Bool) {
        super.viewWillDisappear(animated)
        
        if (captureSession?.running == true) {
            captureSession.stopRunning();
        }
    }
    
    func captureOutput(captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [AnyObject]!, fromConnection connection: AVCaptureConnection!) {
        
        if(self.isScanning == true) {
            if let metadataObject = metadataObjects.first {
                let readableObject = metadataObject as! AVMetadataMachineReadableCodeObject;
                
                AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
                foundCode(readableObject.stringValue);
                
                scannBtn.hidden = false
                self.isScanning = false
            }
        }
        //dismissViewControllerAnimated(true, completion: nil)
    }
    
    func foundCode(code: String) {
        //print(code)
        //print(myEvent)
        
        Ticket.api.scan(code, eventId: myEvent, token: loginKey) { (success, result, error) -> Void in
            if (!success) {
                // Error - show the user
                let errorTitle = "Could not get ticket from server."
                if let error = error {
                    NSLog(error)
                }
                else {
                    NSLog(errorTitle)
                }
            }
            else {
                //self.contact = result
                NSLog(result.description)
                //self.ticketName
                //NSLog("Got Ticket")
                self.failImage.hidden = true
                self.successImage.hidden = false
                
                self.ticketName.text = result["data"]["user"]["firstName"].string!.uppercaseFirst + " " + result["data"]["user"]["lastName"].string!.uppercaseFirst

                self.ticketSection.text = "General Admission"
                
            }
        }
    }
    
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
    
    override func supportedInterfaceOrientations() -> UIInterfaceOrientationMask {
        return .Portrait
    }
    
    @IBAction func goBack(sender : AnyObject) {
        //navigationController!.popViewControllerAnimated(true)
        self.dismissViewControllerAnimated(true, completion: nil)
    }
    
    @IBAction func toggleScan(sender : AnyObject) {
        if(self.isScanning == false) {
            //Stop
            scannBtn.hidden = true
            self.isScanning = true
        } else {
            //Start
            scannBtn.hidden = false
            self.isScanning = false
        }
    }
}

extension String {
    var first: String {
        return String(characters.prefix(1))
    }
    var last: String {
        return String(characters.suffix(1))
    }
    var uppercaseFirst: String {
        return first.uppercaseString + String(characters.dropFirst())
    }
}
