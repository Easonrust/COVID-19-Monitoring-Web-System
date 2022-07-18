# COVID-19 Monitoring Web System

## 1. Introduction

On March 11, according to the assessment, WHO considers the current outbreak of COVID-19 to be a global pandemic. This system is based on various web-side data visualization technologies such as D3.js and highcharts.js, and uses the publicly available epidemic data API to achieve monitoring of the epidemic situation, while using three.js to visualize 3D earth data and Tensorflow.js to build a neural network to achieve simple prediction of the epidemic curve trend.

## 2. Features

### Feature 1: Login and Registration

![image-20200611232456665](https://tva1.sinaimg.cn/large/007S8ZIlly1gforkjx4tgj31ir0u0b2c.jpg)

![image-20200611232529887](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosv8rvp3j31ir0u0b2c.jpg)

The user name, password and country entered during registration must be in English and must be filled in

### Feature 2：Overview of the outbreak data

![image-20200611233330064](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvg7qmnj31if0u0jzz.jpg)

![image-20200611233310930](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvm5kvhj31iu0u07dz.jpg)

When the user logs into the system, the system will automatically switch to the relevant data of the changed country according to the country set at the time of user registration. At the same time, the region bar can select the global and different countries' related data to observe, and the time machine bar can jump to view the historical data of different time, and the chart will also change immediately when sliding.

Users can choose to download the data of the current system as json format files, so that they can directly upload and download the good data for visualization when they log in later.

### Feature 3：World Data Analysis

![image-20200611233937381](https://tva1.sinaimg.cn/large/007S8ZIlly1gforzqufbaj31ih0u0tlv.jpg)

Users can see how the world epidemic is reflected on the map at different times by sliding the scroll bar, the darker the color the larger the corresponding number.

![image-20200611234145800](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvv57l8j324e0to43k.jpg)

Users can enter the names of different countries by themselves to compare the changes of epidemic curves in different countries in a fixed period of time and download the current view as a csv file or image file.

![image-20200611234311869](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosvzbj8mj31ob0u0ahg.jpg)

Users can watch a simple animation of historical data changes in the outbreak as well as view a list of geographically confirmed diagnoses.

### Feature 4：Visualization of 3D Earth data

![image-20200611234444967](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosw3p581j31ip0u0dxy.jpg)

Users can view the epidemic situation in each region through 3D Earth, and can scroll the Earth, click to switch regions or input to switch regions, the Earth will scroll to the corresponding position.

![image-20200611234636844](https://tva1.sinaimg.cn/large/007S8ZIlly1gfosw6u3g3j31i20u07wh.jpg)

The user can import a file in Excel format, the sample format of which is as follows:

| e    | i    | v       |
| ---- | ---- | ------- |
| PE   | PG   | 2935070 |

Where **e** column fills in the departure country number, **i** column fills in the entry country number, and **v** is the magnitude of the correlation value. The scenes shown on the way are the relevant flight movements during the epidemic, and the different color lines represent different entry and exit directions.

> flight.xlsx

### Feature 5：Trend analysis of the epidemic

![image-20200611235205579](https://tva1.sinaimg.cn/large/007S8ZIlly1gfoswakib3j31ir0u0ah9.jpg)

![image-20200611235241853](https://tva1.sinaimg.cn/large/007S8ZIlly1gfoswebvdjj324e0sqn36.jpg)

![image-20200611235252797](https://tva1.sinaimg.cn/large/007S8ZIlly1gfoswi0w3oj324e0niwi7.jpg)

Users can import an Excel file of epidemic-related data (the figure shows the change in China's epidemic data), with the following sample file format:

| day  | confirm |
| ---- | ------- |
| 0    | 548     |

Select the number of days predicted after the current data, train the relevant parameters, activation function, etc., and perform the neural network fitting curve, the system is fixed as a 3-layer neural network.

The system will first normalize the data to get the red curve, and then "denormalize" the data to get the trend within the predicted number of days.

> source.xlsx

## 3. Techniques

Front-end development framework: Vue

Back-end development language: Java

Data visualization technology: Charts.js highcharts.js D3.js

Web3D implementation: Three.js

Front-end neural network: Tensorflow.js

Back-end data persistence: Springboot +Mybatis

Database: MYSQL

Front-end server deployment: nginx

