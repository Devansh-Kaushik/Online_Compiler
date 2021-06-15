# Online_Compiler

So this compiler will run C,C++,Python as well as java code.

*************************************
MODULES USED IN NODE-JS SERVER ARE
1)Fs  2)Mysql  3)Aws-sdk  4)Compile-run
*************************************
This Compiler has two sides one is the user side that is the client side and the other is the server side where the code gets compiled.
This project is using s3bucket thats the aws service and a remote mysql databse.Based on these two the project is working.
So at the client side user comes and types his code he selects the language he also selects that is his code carrying inputs or not,so after clicking on sumbit 
the client code will go to the s3 bucket and it will be in json format and he name of the file will be stored inside he database with the status that is the compilatioon of he code is over or not.

So each any every sumbition of the user will have a new name of his code file.Now as from the client side the work is done now at the same time server should be running.
As In s3 buckrt if the server knows the name of the file its easy for him to donload and store but now as we know that the name of the file is getting change all the time after submition from the lient side so here tthe server will take the name from the rows in side the database and then then the name.json file inside the s3bucket if it is there it will download it and read it then compile accordingly and send a output file inside the s3 bucket and upate the status of the name inside the database that the ork is done so that if new file come it won't search ffor the file whose staus is done.

Now from the Client side after submitting the code client starts waiting for the file name.output inside the s3 bucket as file comes inside s3 bucket it gets downloaded and the n the file gets read and the output is shown.Thats how the entire process is running.

I made this project like this because as students we all can make thses types of project on localhost and make them work and some of them are easy to deploy also as there are many 
free hostiing websites but the projects like this is very hard to delploy as the node server should be connected to a windowws or a linux server because to run code you system must have PYTHON CPP C and JAVA installled 
If anyone wwants to upgrade this project i welcome you .

THATS HOW  MOST PROBABLY ALL COMPILER ARE WORKING LIKE HACKERRANK || LEETCOODE || CODECHEF || PROGRAMIZE || GDB COMPILER ETC

