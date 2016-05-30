//
//  MyTicketsController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/28/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON

class MyTicketsController: UITableViewController {
    @IBOutlet weak var menuButton:UIBarButtonItem!
    @IBOutlet var appsTableView : UITableView!
    
    let defaults = NSUserDefaults.standardUserDefaults()
    var user: String!
    var loginKey: String!
    
    var myTickets:JSON = []
    
    var selected:JSON = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        user = defaults.stringForKey("user")
        loginKey = defaults.stringForKey("loginKey")
        
        
        Ticket.api.findAll(loginKey) { (success, result, error) -> Void in
            if (!success) {
                // Error - show the user
                let errorTitle = "Could not get tickets from server."
                if let error = error {
                    NSLog(error)
                }
                else {
                    NSLog(errorTitle)
                }
            }
            else {
                self.myTickets = result["data"]
                self.appsTableView.reloadData()
            }
        }

        /*
        Ticket.api.find(2, token: loginKey) { (success, result, error) -> Void in
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
                 //NSLog(result.description)
                 //NSLog("Got Ticket")
             }
        }
        */
        
        /*
        Ticket.api.scan("19a0e88f2350e32c8", token: loginKey) { (success, result, error) -> Void in
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
                //NSLog(result.description)
                //NSLog("Got Ticket")
            }
        }
        */
        
        
        if self.revealViewController() != nil {
            menuButton.target = self.revealViewController()
            menuButton.action = "revealToggle:"
            self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        }
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // Return the number of sections.
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // Return the number of rows in the section.
        return myTickets.array!.count
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        selected = myTickets[indexPath.row]
        
        performSegueWithIdentifier("myTicket", sender: nil)
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as! MyTicketsCellController
        
        // Configure the cell...
        /*if indexPath.row == 0 {
            cell.postImageView.image = UIImage(named: "watchkit-intro")
            cell.postTitleLabel.text = "WatchKit Introduction: Building a Simple Guess Game"
            
        } else if indexPath.row == 1 {
            cell.postImageView.image = UIImage(named: "custom-segue-featured-1024")
            cell.postTitleLabel.text = "Building a Chat App in Swift Using Multipeer Connectivity Framework"
            
        } else {
            cell.postImageView.image = UIImage(named: "webkit-featured")
            cell.postTitleLabel.text = "A Beginner’s Guide to Animated Custom Segues in iOS 8"
            
        }*/
        let cur:JSON = myTickets[indexPath.row]
        
        cell.postImageView.image = UIImage(named: "webkit-featured")
        cell.postTitleLabel.text = cur["event"]["title"].string!
        
        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject!){
        if (segue.identifier == "myTicket") {
            let navVC = segue.destinationViewController as! UINavigationController
            let myticket = navVC.viewControllers.first as! MyTicketController
            
            myticket.myTicket = selected
        }
    }
    
    
    /*
     // Override to support conditional editing of the table view.
     override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
     // Return NO if you do not want the specified item to be editable.
     return true
     }
     */
    
    /*
     // Override to support editing the table view.
     override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
     if editingStyle == .Delete {
     // Delete the row from the data source
     tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
     } else if editingStyle == .Insert {
     // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
     }
     }
     */
    
    /*
     // Override to support rearranging the table view.
     override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {
     
     }
     */
    
    /*
     // Override to support conditional rearranging of the table view.
     override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
     // Return NO if you do not want the item to be re-orderable.
     return true
     }
     */
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
     // Get the new view controller using [segue destinationViewController].
     // Pass the selected object to the new view controller.
     }
     */
    
}

