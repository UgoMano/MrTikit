//
//  LoginController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 4/6/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON

class LoginController: UIViewController {
    @IBOutlet weak var email: UITextField?
    @IBOutlet weak var password: UITextField?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        /*
        User.api.login("test@test.com", password: "test12") { (success, result, error) -> Void in
            if (!success) {
                // Error - show the user
                let errorTitle = "Could not login to server." //to sever
                if let error = error {
                    NSLog(error)
                }
                else {
                    NSLog(errorTitle)
                }
            }
            else {
                //self.contact = result
                //NSLog(result.description)
                
                let defaults = NSUserDefaults.standardUserDefaults()
                
                defaults.setValue(result.stringValue, forKey: "user")
                defaults.setValue(result["data"]["token"].string!, forKey: "loginKey")
                
                defaults.synchronize()
                
                self.performSegueWithIdentifier("home", sender: self)
            }
        }*/

        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    /*override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject!){
        if (segue.identifier == "home") {
            let reveal = segue.destinationViewController as! SWRevealViewController
            let menu = reveal.rearViewController as! MenuController
            
            menu.loginKey = ""
            menu.user = nil
        }
    }*/
    
    //Actions
    @IBAction func login(sender: UIButton) {
        User.api.login(email!.text!, password: password!.text!) { (success, result, error) -> Void in
            if (!success) {
                // Error - show the user
                let errorTitle = "Could not login to server." //to sever
                if let error = error {
                    NSLog(error)
                }
                else {
                    NSLog(errorTitle)
                }
            }
            else {
                //self.contact = result
                //NSLog(result.description)
                
                let defaults = NSUserDefaults.standardUserDefaults()
                
                defaults.setValue(result.stringValue, forKey: "user")
                defaults.setValue(result["data"]["token"].string!, forKey: "loginKey")
                
                defaults.synchronize()
                
                self.performSegueWithIdentifier("home", sender: self)
            }
        }
    }
    
}