//
//  LoginController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 4/6/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON
import FBSDKCoreKit
import FBSDKLoginKit
import FBSDKShareKit

class LoginController: UIViewController, FBSDKLoginButtonDelegate {
    @IBOutlet weak var email: UITextField?
    @IBOutlet weak var password: UITextField?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        /*
        if (FBSDKAccessToken.currentAccessToken() != nil)
        {
            let loginView : FBSDKLoginButton = FBSDKLoginButton()
            self.view.addSubview(loginView)
            loginView.center = self.view.center
            loginView.readPermissions = ["public_profile", "email", "user_friends"]
            loginView.delegate = self
            
            // User is already logged in, do work such as go to next view controller.
            NSLog(FBSDKAccessToken.currentAccessToken().tokenString)
            User.api.facebookLogin(FBSDKAccessToken.currentAccessToken().tokenString) { (success, result, error) -> Void in
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
        else
        {
            let loginView : FBSDKLoginButton = FBSDKLoginButton()
            self.view.addSubview(loginView)
            loginView.center = self.view.center
            loginView.readPermissions = ["public_profile", "email", "user_friends"]
            loginView.delegate = self
        }
        
        
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
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // Facebook Delegate Methods
    func loginButton(loginButton: FBSDKLoginButton!, didCompleteWithResult result: FBSDKLoginManagerLoginResult!, error: NSError!) {
        print("User Logged In")
        //NSLog(FBSDKAccessToken.currentAccessToken().tokenString)
        
        if ((error) != nil)
        {
            // Process error
        }
        else if result.isCancelled {
            // Handle cancellations
        }
        else {
            NSLog("Got User")
            
            // User is already logged in, do work such as go to next view controller.
            NSLog(FBSDKAccessToken.currentAccessToken().tokenString)
            User.api.facebookLogin(FBSDKAccessToken.currentAccessToken().tokenString) { (success, result, error) -> Void in
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
    
    func loginButtonDidLogOut(loginButton: FBSDKLoginButton!) {
        print("User Logged Out")
    }
    
    func returnUserData()
    {
        let graphRequest : FBSDKGraphRequest = FBSDKGraphRequest(graphPath: "me", parameters: nil)
        graphRequest.startWithCompletionHandler({ (connection, result, error) -> Void in
            
            if ((error) != nil)
            {
                // Process error
                print("Error: \(error)")
            }
            else
            {
                print("fetched user: \(result)")
                //let userName : NSString = result.valueForKey("name") as! NSString
                //print("User Name is: \(userName)")
                //let userEmail : NSString = result.valueForKey("email") as! NSString
                //print("User Email is: \(userEmail)")
            }
        })
    }
    
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