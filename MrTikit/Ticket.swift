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

class Ticket: Api {
    static let api = Ticket()
    
    func find(id: Int, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        let headers = [
            "Content-Type": "application/json",
            "Authorization": "JWT " + token
        ]
        let req = Alamofire.request(.GET, "http://54.69.160.45:8000/v1/tickets/" + id.description, headers: headers, encoding: .JSON).validate()
        
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
    
    func findAll(token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        let headers = [
            "Content-Type": "application/json",
            "Authorization": "JWT " + token
        ]
        
        //TODO: Change this
        let parameters = [
            "userId": 1
        ]
        
        let req = Alamofire.request(.POST, "http://54.69.160.45:8000/v1/tickets/getUserTickets", headers: headers, parameters: parameters, encoding: .JSON).validate()
        
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
        //TODO: Will be implemented in next version
        return
    }
    
    func update(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        //TODO: Will be implemented in next version
        return
    }
    
    func scan(scanId: String, eventId: String, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void) {
        let headers = [
            "Content-Type": "application/json",
            "Authorization": "JWT " + token
        ]
        
        let parameters = [
            "ticketScanId": scanId,
            "eventId": eventId
        ]
        
        let req = Alamofire.request(.POST, "http://54.69.160.45:8000/v1/tickets/scanTicket", headers: headers, parameters: parameters, encoding: .JSON).validate()
        
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


