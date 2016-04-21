//
//  MyTicketController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/30/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON

class MyTicketController: UIViewController {
    @IBOutlet weak var imgQRCode: UIImageView!
    @IBOutlet weak var eventTitle: UILabel!
    @IBOutlet weak var startEndDate: UILabel!
    @IBOutlet weak var ticketInfo: UILabel!
    
    var myTicket:JSON!
    
    override func viewDidLoad() {
        super.viewDidLoad()
     
        imgQRCode.image = generateCode(myTicket["scanId"].string!)
        
        eventTitle.text = myTicket["event"]["title"].string!
        
        
        //Fill the date out
        var startDate:String = ""
        var endDate:String = ""
        
        if(myTicket["event"]["startDateTime"].string! != "") {
            startDate = toDateTime(myTicket["event"]["startDateTime"].string!)
        }
        
        if(myTicket["event"]["endDateTime"].string! != "") {
            endDate = toDateTime(myTicket["event"]["endDateTime"].string!)
        }
        
        if(endDate == "") {
            startEndDate.text = startDate
        } else {
            startEndDate.text = startDate + " - " + endDate
        }
        
        ticketInfo.text = "$" + myTicket["ticketType"]["price"].int!.description + " " + myTicket["ticketType"]["name"].string!
    }
    
    func generateCode(input: String) -> UIImage {
        let filter = CIFilter(name: "CIQRCodeGenerator")
        
        let data = input.dataUsingEncoding(NSUTF8StringEncoding)
        filter!.setValue("H", forKey:"inputCorrectionLevel")
        filter!.setValue(data, forKey:"inputMessage")
        
        let outputImage = filter!.outputImage
        let context = CIContext(options:nil)
        let cgImage = context.createCGImage(outputImage!, fromRect:outputImage!.extent)
        
        let image = UIImage(CGImage:cgImage, scale:1.0, orientation:UIImageOrientation.Up)
        let resized = resizeImage(image, withQuality: CGInterpolationQuality.None, rate:5.0)
        return resized
    }
    
    func resizeImage(image: UIImage, withQuality quality: CGInterpolationQuality, rate: CGFloat) -> UIImage {
        let width = image.size.width * rate
        let height = image.size.height * rate
        
        UIGraphicsBeginImageContextWithOptions(CGSizeMake(width, height), true, 0)
        let context = UIGraphicsGetCurrentContext()
        CGContextSetInterpolationQuality(context, quality)
        image.drawInRect(CGRectMake(0, 0, width, height))
        
        let resized = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();        
        return resized;
    }
    
    func toDateTime(input: String) -> String
    {
        let formatter = NSDateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        let localDate = formatter.dateFromString(input)
        
        let dateFormatter = NSDateFormatter()
        dateFormatter.dateFormat = "dd-MM-yyyy h:mm a"
        let DateInFormat = dateFormatter.stringFromDate(localDate!)
        
        return DateInFormat
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func goBack(sender : AnyObject) {
        //navigationController!.popViewControllerAnimated(true)
        self.dismissViewControllerAnimated(true, completion: nil);
    }
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
     // Get the new view controller using segue.destinationViewController.
     // Pass the selected object to the new view controller.
     }
     */
    
}
