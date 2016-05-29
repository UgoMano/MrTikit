//
//  FanyLoginController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 5/23/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON
import FBSDKCoreKit
import FBSDKLoginKit
import FBSDKShareKit

class FancyLoginController: UIViewController, FBSDKLoginButtonDelegate {
    
    //MARK: Outlets for UI Elements.
    @IBOutlet weak var usernameField: UITextField!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var passwordField: UITextField!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var facebookButton: FBSDKLoginButton!
    
    
    //MARK: Global Variables for Changing Image Functionality.
    private var idx: Int = 0
    private var backGroundArray = []
    
    //MARK: View Controller LifeCycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        backGroundArray = [UIImage(named: "img1")!, UIImage(named: "img2")!, UIImage(named: "img3")!, UIImage(named: "img4")!, UIImage(named: "img5")!, UIImage(named: "img6")!, UIImage(named: "img7")!, UIImage(named: "img8")!, UIImage(named: "img9")!]
        
        usernameField.alpha = 0;
        passwordField.alpha = 0;
        loginButton.alpha   = 0;
        
        UIView.animateWithDuration(0.7, delay: 0, options: UIViewAnimationOptions.CurveEaseIn, animations: {
            self.usernameField.alpha = 1.0
            self.passwordField.alpha = 1.0
            self.loginButton.alpha   = 0.9
            }, completion: nil)
        
        // Notifiying for Changes in the textFields
        usernameField.addTarget(self, action: #selector(FancyLoginController.textFieldDidChange), forControlEvents: UIControlEvents.EditingChanged)
        passwordField.addTarget(self, action: #selector(FancyLoginController.textFieldDidChange), forControlEvents: UIControlEvents.EditingChanged)
        
        
        // Visual Effect View for background
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: UIBlurEffectStyle.Dark)) as UIVisualEffectView
        visualEffectView.frame = self.view.frame
        visualEffectView.alpha = 0.5
        imageView.image = UIImage(named: "img3.jpg")
        imageView.addSubview(visualEffectView)
        
        
        NSTimer.scheduledTimerWithTimeInterval(6, target: self, selector: #selector(FancyLoginController.changeImage), userInfo: nil, repeats: true)
        self.loginButton(false)
        
    
        //Facebook Below
        if (FBSDKAccessToken.currentAccessToken() != nil)
        {
            facebookButton.readPermissions = ["public_profile", "email", "user_friends"]
            facebookButton.delegate = self
            
            // User is already logged in, do work such as go to next view controller.
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
                    let defaults = NSUserDefaults.standardUserDefaults()
                    
                    defaults.setValue(result.stringValue, forKey: "user")
                    defaults.setValue(result["data"]["token"].string!, forKey: "loginKey")
                    
                    defaults.synchronize()
                    
                    let progressHUD = ProgressHUD(text: "Logging In")
                    self.view.addSubview(progressHUD)
                    
                    progressHUD.show()
                    
                    self.usernameField.text = ""
                    self.passwordField.text = ""
                    
                    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, Int64(1 * Double(NSEC_PER_SEC))), dispatch_get_main_queue(), { () -> Void in
                        progressHUD.hide()
                        self.performSegueWithIdentifier("home", sender: self)
                    })
                }
            }
        }
        else
        {
            facebookButton.readPermissions = ["public_profile", "email", "user_friends"]
            facebookButton.delegate = self
        }
        
        let defaults = NSUserDefaults.standardUserDefaults()
        
        if(defaults.valueForKey("user") != nil || defaults.valueForKey("loginKey") != nil) {
            let progressHUD = ProgressHUD(text: "Logging In")
            self.view.addSubview(progressHUD)
            
            progressHUD.show()
            
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, Int64(1 * Double(NSEC_PER_SEC))), dispatch_get_main_queue(), { () -> Void in
                progressHUD.hide()
                self.performSegueWithIdentifier("home", sender: self)
            })
        }
    }
    
    
    
    
    func loginButton(enabled: Bool) -> () {
        func enable(){
            UIView.animateWithDuration(0.3, delay: 0, options: UIViewAnimationOptions.CurveEaseIn, animations: {
                self.loginButton.backgroundColor = UIColor.colorWithHex("#C23B22", alpha: 1)
                }, completion: nil)
            loginButton.enabled = true
        }
        func disable(){
            loginButton.enabled = false
            UIView.animateWithDuration(0.3, delay: 0, options: UIViewAnimationOptions.CurveEaseOut, animations: {
                self.loginButton.backgroundColor = UIColor.colorWithHex("#333333",alpha :1)
                }, completion: nil)
        }
        return enabled ? enable() : disable()
    }
    
    func changeImage(){
        if idx == backGroundArray.count-1{
            idx = 0
        }
        else{
            idx += 1
        }
        let toImage = backGroundArray[idx];
        UIView.transitionWithView(self.imageView, duration: 3, options: .TransitionCrossDissolve, animations: {self.imageView.image = toImage as? UIImage}, completion: nil)
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    
    func textFieldDidChange() {
        if usernameField.text!.isEmpty || passwordField.text!.isEmpty
        {
            self.loginButton(false)
        }
        else
        {
            self.loginButton(true)
        }
    }
    
    @IBAction func buttonPressed(sender: AnyObject) {
        self.performSegueWithIdentifier("login", sender: self)
    }
    
    @IBAction func signupPressed(sender: AnyObject) {
    }
    
    
    @IBAction func backgroundPressed(sender: AnyObject) {
        usernameField.resignFirstResponder()
        passwordField.resignFirstResponder()
        
    }
    
    // Facebook Delegate Methods
    func loginButton(loginButton: FBSDKLoginButton!, didCompleteWithResult result: FBSDKLoginManagerLoginResult!, error: NSError!) {
        print("User Logged In")
        
        if ((error) != nil)
        {
            // Process error
        }
        else if result.isCancelled {
            // Handle cancellations
        }
        else {
            //NSLog("Got User")
            
            // User is already logged in, do work such as go to next view controller.
            facebooklogin(self.facebookButton)
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
        User.api.login(usernameField!.text!, password: passwordField!.text!) { (success, result, error) -> Void in
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
                let defaults = NSUserDefaults.standardUserDefaults()
                
                defaults.setValue(result.stringValue, forKey: "user")
                defaults.setValue(result["data"]["token"].string!, forKey: "loginKey")
                
                defaults.synchronize()
                
                let progressHUD = ProgressHUD(text: "Logging In")
                self.view.addSubview(progressHUD)
                
                progressHUD.show()
                
                self.usernameField.text = ""
                self.passwordField.text = ""
                
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, Int64(1 * Double(NSEC_PER_SEC))), dispatch_get_main_queue(), { () -> Void in
                    progressHUD.hide()
                    self.performSegueWithIdentifier("home", sender: self)
                })
            }
        }
    }
    
    @IBAction func facebooklogin(sender: UIButton) {
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
                
                let progressHUD = ProgressHUD(text: "Logging In")
                self.view.addSubview(progressHUD)
                
                progressHUD.show()
                
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, Int64(1 * Double(NSEC_PER_SEC))), dispatch_get_main_queue(), { () -> Void in
                    progressHUD.hide()
                    self.performSegueWithIdentifier("home", sender: self)
                })
            }
        }
    }
    
}

//Extension for Color to take Hex Values
extension UIColor{
    
    class func colorWithHex(hex: String, alpha: CGFloat = 1.0) -> UIColor {
        var rgb: CUnsignedInt = 0;
        let scanner = NSScanner(string: hex)
        
        if hex.hasPrefix("#") {
            // skip '#' character
            scanner.scanLocation = 1
        }
        scanner.scanHexInt(&rgb)
        
        let r = CGFloat((rgb & 0xFF0000) >> 16) / 255.0
        let g = CGFloat((rgb & 0xFF00) >> 8) / 255.0
        let b = CGFloat(rgb & 0xFF) / 255.0
        
        return UIColor(red: r, green: g, blue: b, alpha: alpha)
    }
}





