//
//  Api.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/31/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import SwiftyJSON
//import ObjectMapper

protocol Api {
    func find(id: Int, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void)
    func findAll(token: String, completion: (success: Bool, result: JSON, error: String?) -> Void)
    func create(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void)
    func update(object: JSON, token: String, completion: (success: Bool, result: JSON, error: String?) -> Void)
    //func delete(id: Int, token: String) -> JSON
}