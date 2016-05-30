//
//  User.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/28/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import Foundation
import SwiftyJSON
import Alamofire

class User: Api {
    static let api = User()
    
    func find(id: Int, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
       return
    }
    
    func findAll(token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        return
    }
    
    func create(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        return
    }
    
    func update(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        return
    }
    
    func login(username: String, password: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        let req = Alamofire.request(.POST, "http://54.69.160.45:8000/v1/auth/signin", parameters: ["email": username, "password": password, "event": 2], encoding: .JSON).validate()
        
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
    
    func facebookLogin(token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        let req = Alamofire.request(.POST, "http://54.69.160.45:8000/v1/auth/social", parameters: ["type": "facebook", "access_token": token], encoding: .JSON).validate()
        
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
}


