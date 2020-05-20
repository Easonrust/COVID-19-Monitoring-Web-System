package com.homework.web.taobao.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @RequestMapping("/")
    public String index(){
        return "register";
    }
    @RequestMapping("/login")
    public String toLogin(){
        return "login";
    }

    @RequestMapping("/hello")
    public String toHello(){
        return "hello";
    }
}
