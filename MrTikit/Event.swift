//
//  Event.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/30/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import Foundation
import SwiftyJSON
import Alamofire

class Event: Api {
    static let api = Event()
    
    func find(id: Int, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        return
    }
    
    func findAll(token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {        
        let headers = [
            "Content-Type": "application/json",
            "Authorization": "JWT " + token
        ]
        let req = Alamofire.request(.GET, "http://54.69.160.45:8000/v1/events", headers: headers, encoding: .JSON).validate()
        
        req.responseJSON {
            response in
            switch response.result {
                case .Failure(_):
                    if let errorString = JSON(data: response.data!)["message"].string {
                        completion(success: false, result: nil, error: errorString)
                    }
                    else if let errorString = JSON(data: response.data!)["code"].string {
                        completion(success: false, result: nil, error: errorString)
                    }
                    else {
                        completion(success: false, result: nil, error: "Unknown error")
                    }
                    return
                case .Success:
                    // Parse the JSON response
                    let json = JSON(response.result.value!)
                    completion(success: true, result: json, error: nil)
                    return
            }
        }
    }
    
    func create(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        return
    }
    
    func update(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        return
    }
}


