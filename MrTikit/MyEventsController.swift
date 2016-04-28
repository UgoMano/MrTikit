//
//  MyEventsController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/28/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit
import SwiftyJSON

class MyEventsController: UITableViewController {
    @IBOutlet weak var menuButton:UIBarButtonItem!
    @IBOutlet var appsTableView : UITableView!
    
    let defaults = NSUserDefaults.standardUserDefaults()
    var user: String!
    var loginKey: String!
    
    var myEvents:JSON = []
    var selected:JSON = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        user = defaults.stringForKey("user")
        loginKey = defaults.stringForKey("loginKey")
        
        Event.api.findAll(loginKey) { (success, result, error) -> Void in
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
                self.myEvents = result["data"]
                self.appsTableView.reloadData()
            }
        }
        
        if self.revealViewController() != nil {
            menuButton.target = self.revealViewController()
            menuButton.action = "revealToggle:"
            self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
        }
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
        return myEvents.array!.count
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        selected = myEvents[indexPath.row]
        
        performSegueWithIdentifier("scanTicket", sender: nil)
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as! MyEventsCellController
        
        let cur:JSON = myEvents[indexPath.row]
        //cell.postImageView.image = UIImage(named: "webkit-featured")
        cell.postTitleLabel.text = cur["title"].description
        
        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject!){
        if (segue.identifier == "scanTicket") {
            let navVC = segue.destinationViewController as! UINavigationController
            let scanTicket = navVC.viewControllers.first as! ScanTicketController
            
            scanTicket.myEvent = selected
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


