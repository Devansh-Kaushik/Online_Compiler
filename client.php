<?php
require 'C:/Users/DEVANSH/Downloads/aws.phar';
use Aws\S3\S3Client;
$servername = "remotemysql.com";
$username = "lO01dRyKJ0";
$password = "ptMFxHu9do";
$dbname = "lO01dRyKJ0";
$name =  uniqid();
// on button click
if(isset($_POST['submit'])) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Giving unique id to the client
    $sql = "INSERT INTO detail (`Name`,`Status`) VALUES ('$name','resume')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } 
    $conn->close();
    $code= $_POST['code'];
    $input= $_POST['input'];
    $radio=$_POST['inputRadio'];
    if(!empty($_POST['lang'])) {
        foreach ($_POST['lang'] as $selected){
            $lang=$selected;
            if($radio=="true")
            {
                $array1 = array(
                    "radio" =>  $radio,
                    "code" =>  $code,
                    "input" => $input,
                    "lang" => $lang,
                );
                $json1 = json_encode($array1);
                $bytes = file_put_contents("C:/xampp/htdocs/hello/$name.json", $json1);
            }
            if($radio=="false")
            {
                $array2 = array(
                    "radio" =>  $radio,
                    "code" =>  $code,
                    "lang" => $lang,
                );
                $json2 = json_encode($array2);
                $bytes = file_put_contents("C:/xampp/htdocs/hello/$name.json", $json2);
            }
        }   
    }
    $bucket="code-compiler";
    $key1="AKIAW4GO5H52YS65OYFV";
    $secret="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";
    $client = S3Client::factory(array(
        'credentials' => array(
            'key' => $key1,
            'secret' => $secret
        ),
            'version' => 'latest',
            'region' => 'ap-south-1'
    ));
    $pathToFile="C:/xampp/htdocs/hello/$name.json";
    $result = $client->putObject(array(
        'Bucket'     => $bucket,
        'Key'        => "$name.json",
        'SourceFile' => $pathToFile,
        'StorageClass' => 'REDUCED_REDUNDANCY'
    ));

    $file_pointer = "C:/xampp/htdocs/hello/$name.json"; 
    if (!unlink($file_pointer)) { 
        echo ("$file_pointer cannot be deleted due to an error"); 
    } 
    else { 
        echo ("$file_pointer has been deleted"); 
    } 


    $filename1 = "C:/xampp/htdocs/hello/$name.txt";
    if (file_exists($filename1)) {
        $myfile1 = fopen($filename1, "w");
        fwrite($myfile1, "");
        fclose($myfile1);
    }
    function repeat($name){
        $bucket="code-compiler";
        $key1="AKIAW4GO5H52YS65OYFV";
        $secret="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";
        $client = S3Client::factory(array(
            'credentials' => array(
                'key' => $key1,
                'secret' => $secret
            ),
                'version' => 'latest',
                'region' => 'ap-south-1'
        ));
        $FileName="$name.txt";
        $info = $client->doesObjectExist($bucket, $FileName);
        if ($info)
        {
            $pathToFile1="C:/xampp/htdocs/hello/$name.txt";
            $result = $client->getObject(array(
                'Bucket'     => $bucket,
                'Key'        => "$name.txt",
                'SaveAs' => $pathToFile1
            ));
            $file = fopen("C:/xampp/htdocs/hello/$name.txt","r");
            echo fread($file,filesize("C:/xampp/htdocs/hello/$name.txt"));
            fclose($file);
            $result = $client->deleteObject(array(
                'Bucket' => $bucket,
                'Key'    => "$name.txt"
            ));
        }
        else
        {
            repeat($name);
        
        }
    }

    repeat($name);
}
/*if(isset($_POST['reset']))
{
    $file_pointer1 = "C:/xampp/htdocs/hello/$name.json"; 
   
    // Use unlink() function to delete a file 
    if (!unlink($file_pointer1)) { 
        echo ("$file_pointer1 cannot be deleted due to an error"); 
    } 
    else { 
        echo ("$file_pointer1 has been deleted"); 
    }
    $file_pointer2 = "C:/xampp/htdocs/hello/$name.txt"; 
   
    // Use unlink() function to delete a file 
    if (!unlink($file_pointer2)) { 
        echo ("$file_pointer2 cannot be deleted due to an error"); 
    } 
    else { 
        echo ("$file_pointer2 has been deleted"); 
    }
    
}*/
?>
