//
//  MyTicketsCellController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/30/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit

class MyTicketsCellController: UITableViewCell {
    
    @IBOutlet weak var postImageView:UIImageView!
    @IBOutlet weak var postTitleLabel:UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
}