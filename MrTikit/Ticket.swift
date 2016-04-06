//
//  Ticket.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/30/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import Foundation
import SwiftyJSON
import Alamofire

class Ticket {
    
    init() {
    }
    
    func login(username: String, password: String) -> Double {
        
        Alamofire.request(.POST, "http://54.69.160.45:8000/v1/auth/signin", parameters: ["email": username, "password": password, "event": 2], encoding: .JSON)
            .responseJSON { response in
                if let JSON = response.result.value {
                    print(JSON["message"])
                }
        }
        
        return 10.0
    }
    
}


