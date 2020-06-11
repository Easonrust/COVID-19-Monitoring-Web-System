# COVID-19 疫情监测系统

> Web系统与技术课程期末项目报告
>
> 1751894 杨乐

## 1.设计思路

新型冠状病毒肺炎*（Corona Virus Disease 2019，COVID-19）*，简称“新冠肺炎”，世界卫生组织命名为“2019冠状病毒病” ，是指2019新型冠状病毒感染导致的肺炎，3月11日，根据评估，世卫组织认为当前新冠肺炎疫情可被称为全球大流行。本系统基于D3.js、highcharts.js等多种web端数据可视化技术，利用公开的疫情数据API，实现对疫情情况的监测，同时利用three.js实现3D地球数据的可视化，利用Tensorflow.js搭建神经网络实现疫情曲线趋势的简单预测。

本项目已经部署远程服务，地址：http://123.57.229.179:8090/

## 2.功能介绍

### 功能 1：登录注册

![image-20200611232456665](https://tva1.sinaimg.cn/large/007S8ZIlly1gforkjx4tgj31ir0u0b2c.jpg)

![image-20200611232529887](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosv8rvp3j31ir0u0b2c.jpg)

用户注册时所输入的用户名、密码与国家均需为英文，且必须填写。

### 功能 2：疫情数据概览

![image-20200611233330064](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvg7qmnj31if0u0jzz.jpg)

![image-20200611233310930](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvm5kvhj31iu0u07dz.jpg)

用户登录进系统时，系统会根据用户注册时设定的国家自动切换到改国家的相关数据。同时，地区栏可以选择全球以及不同国家的相关数据进行观察，时光机栏可跳转查看不同时间的历史数据，滑动时图表也会立即发生相关变化。

由于使用国外的API，连接有时不太稳定，用户可以选择下载当前系统的数据为json格式文件，在之后登录时可直接上传以及下载好的数据进行可视化。

### 功能 3：世界数据分析

![image-20200611233937381](https://tva1.sinaimg.cn/large/007S8ZIlly1gforzqufbaj31ih0u0tlv.jpg)

用户可在通过滑动滚动条的方式查看不同时间世界疫情反映在地图上的情况，颜色越深对应的数字越大。

![image-20200611234145800](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvv57l8j324e0to43k.jpg)

用户可自行输入不同国家的名字，比较不同国家在固定时间内的疫情曲线变化情况，并可下载当前视图为csv文件或图片文件。

![image-20200611234311869](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvzbj8mj31ob0u0ahg.jpg)

用户可观看简单的疫情历史数据变化动画以及观看地域确诊列表。

### 功能 4：3D地球数据的可视化

![image-20200611234444967](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosw3p581j31ip0u0dxy.jpg)

用户可通过3D地球查看各地区疫情情况，可滚动地球，点击切换地区或输入切换地区，地球均会滚动到相应位置。

![image-20200611234636844](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosw6u3g3j31i20u07wh.jpg)

用户可导入Excel格式的文件，示例格式其中如下

| e    | i    | v       |
| ---- | ---- | ------- |
| PE   | PG   | 2935070 |

其中 **e** 列填写出发国家编号，**i** 列填写进入国家编号，**v** 为相关关系数值大小。途中所示场景为疫情期间的相关航班往来情况，不同颜色的线代表不同的进出方向。

> 示例文件flight.xlsx

### 功能 5：疫情趋势分析

![image-20200611235205579](https://tva1.sinaimg.cn/large/007S8ZIlly1gfoswakib3j31ir0u0ah9.jpg)

![image-20200611235241853](https://tva1.sinaimg.cn/large/007S8ZIlly1gfoswebvdjj324e0sqn36.jpg)

![image-20200611235252797](https://tva1.sinaimg.cn/large/007S8ZIlly1gfoswi0w3oj324e0niwi7.jpg)

用户可导入疫情相关数据的Excel文件（图中所示是中国疫情数据变化），示例文件格式如下：

| day  | confirm |
| ---- | ------- |
| 0    | 548     |

选择当前数据之后预测的天数，训练相关参数，激活函数等，进行神经网络拟合曲线，系统固定为3层神经网络。

系统首先会将数据归一化后进行预测，得到红色的拟合曲线，之后进行预测后“反归一化”得到预测天数范围内的变化趋势。

> 示例文件source.xlsx

## 3.项目特点

1. 项目提供国际化功能，可切换系统为英文。
2. 使用多种数据可视化技术如Charts.js、highcharts.js、D3.js进行疫情数据的可视化，用户可对各国数据进行比较分析，并可查看历史数据数据具有实时特点，且提供了下载数据和上传数据的接口。
3. 使用Three.js进行3D地球数据的可视化，提高了系统的观赏性和趣味性，同时支持用户自己上传相关数据，增强了交互性.
4. 使用Tensorflow.js进行疫情数据的相关预测，为疫情趋势的变化提供一定参考，且网络可有用户自行定义相关的参数，更加灵活。

## 4.开发框架

前端开发框架：Vue

后端开发语言：Java

数据可视化技术：Charts.js highcharts.js D3.js

Web3D实现：Three.js

前端神经网络：Tensorflow.js

后端数据持久化：Springboot +Mybatis

数据库：MYSQL

前端服务器部署：nginx