## Overview




Technologies used
- NextJS+React is used to create the front-end and manage the server. It also provides routing and manages static assets (css, images). This project is made vanilla with these tools, and does not use component or css libraries like Tailwind. 
- EdgeDB / Gel is used as the database. It's an ORM + service wrapper around postgresql that serves as the database for this project, storing laptops, articles, admin login and other data.
- TRPC to create an API, allowing for communication between the client and the server. This allows for secure admin login, filtered querying of laptops and articles, and the modification of values in the database.

Features
- Filter laptops based on specific hardware data like the presence of a dedicated GPU, the amount of RAM and cpu clock speed, etc.
- Find laptops by use-case based on a scoring feature; intended for users who are not very familiar with the hardware they are after and simply want the best option for student work, gaming, office work or video editing at the lowest price.
- Read articles on tech and hardware to learn about the world of technology.
- For admins, login and write articles or manually insert laptops using a complete user interface.

## Gallary

![image](https://github.com/user-attachments/assets/dc582f65-65f2-4773-9a3b-01fadc62d276)
![image](https://github.com/user-attachments/assets/61142580-4797-42e3-80f2-c78caad31b3f)
![image](https://github.com/user-attachments/assets/719f13f1-7c7c-4f84-8919-7fd5744a29b0)
![image](https://github.com/user-attachments/assets/bb31be4e-b6e9-4833-bf55-67a4500eecfe)
