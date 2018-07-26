# Mharo Doctor

This is the app created by team-linters for Rajasthan Hackathon 5.0. **Website is hosted at http://178.128.111.216:9001** 

## Links to Sites/apk

We have 3 dedicated servers taking care of website and mobile backend (at http://178.128.111.216:1807), ML-backend (at http://178.128.111.216:8080) and the frontend (at http://178.128.111.216:9001).

We have created an apk which can be downloaded [here][https://github.com/NK-Nikunj/Rajasthan-Hackathon/blob/master/Android%20App/apk/Mharo%20Doctor.apk].

## Overview

We aim to digitize anything and everything relating to medical treatments, medical prescriptions and medical appointments. We aim to introduce transparency in the field of medicine where patients are scandaled for incorrect medical prescriptions or treatment costs.

This initiative of ours introduces various technologies like AI algorithms and specialized Machine Learning algorithms. The backend is hosted on Node.js and Flask with frontend written in purely static form (so as to introdce safety measures). The frontend is written in HTML, BootStrap and jQuery and is made responsive for a better UI/UX experience.

## Features

We provide the following features to Users and Doctors:

* First and foremost, We provide a *single touch* emergency button on our android app for emergency sitautions. When touched all nearby doctors will be notified of your situation so that they can act on the same.

* Secondly, We use specialized Machine Learning algorithms (with accuracies reaching 98%) to predict diseases based on symptoms. This is specially useful for remote diagnosis so that the patient can reach the right doctor in case of a medical situation.

* Thirdly, We provide various remote features to the users. One of which is remote user appointment requests. The user can request for appointments to any doctors nearby. The doctor can then act upon the request to either reject or accept it. The user will be notified when the doctor replies to the request.

* We provide 2-way authentication everywhere we feel the doctor can spam users for their own needs. The authentication requires OTP sent to the user to proceed further.

* We provide an interactive and responsive UI/UX for the easy usability for the doctor and the user. The user can easily go through his/her previous medical records.

## TODO

* We currently do not support specialization of doctors which we would like to add for a better usability of the app.
* We feel there is a need for chat forum between doctors and users for better remote diagnosis in case the doctor agrees for the same.
* Currently we link aadhar with the number and not with the Govt provided aadhar since they need authentication and valid reasons.