package com.homework.web.taobao.controller;
//
//import com.homework.web.taobao.entity.UserEntity;
//import com.homework.web.taobao.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/homework/test")
//public class UserController {
//
//    @Autowired
//    private UserService userService ;
//
//    @RequestMapping(value = "/get/{id}",method = RequestMethod.GET)
//    public UserEntity user(@PathVariable String id){
//        System.out.println("id:" + id);
//        return userService.getById(id);
//    }
//
//
//}