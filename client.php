<?php
require 'C:/Users/USERNAME/Downloads/aws.phar';// you can get aws.phar it from aws doc  for php
use Aws\S3\S3Client;
$servername = "HOSTNAME";
$username = "USERNAME OF THE HOST";
$password = "PASSWORD OF THE HOST";
$dbname = "DATABASE NAME";
$name =  uniqid();
if(isset($_POST['submit'])) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Giving unique id to the client
    $sql = "INSERT INTO detail (`Name`,`Status`) VALUES ('$name','resume')";
    if ($conn->query($sql) === TRUE) {
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
                $bytes = file_put_contents("C:/data/$name.json", $json1);
            }
            if($radio=="false")
            {
                $array2 = array(
                    "radio" =>  $radio,
                    "code" =>  $code,
                    "lang" => $lang,
                );
                $json2 = json_encode($array2);
                $bytes = file_put_contents("C:/data/$name.json", $json2);
            }
        }   
    }
    $bucket="AWS Bucket Name";
    $key1="Get YOUR AWS KEY ID";
    $secret="Get YOUR AWS SECRET KEY ID";
    $client = S3Client::factory(array(
        'credentials' => array(
            'key' => $key1,
            'secret' => $secret
        ),
            'version' => 'latest',
            'region' => 'GET REGION'
    ));
    $pathToFile="C:/data/$name.json";
    $result = $client->putObject(array(
        'Bucket'     => $bucket,
        'Key'        => "$name.json",
        'SourceFile' => $pathToFile,
        'StorageClass' => 'REDUCED_REDUNDANCY'
    ));

    $file_pointer = "C:/data/$name.json"; 
    if (!unlink($file_pointer)) { 
        echo ("$file_pointer cannot be deleted due to an error"); 
    } 
    else { 
        echo ("$file_pointer has been deleted"); 
    } 


    $filename1 = "C:/data/$name.txt";
    if (file_exists($filename1)) {
        $myfile1 = fopen($filename1, "w");
        fwrite($myfile1, "");
        fclose($myfile1);
    }
    function repeat($name){
        $bucket="Bucket name";
        $key1="Get YOUR AWS KEY ID";
        $secret="Get YOUR AWS SECRET KEY ID";
        $client = S3Client::factory(array(
            'credentials' => array(
                'key' => $key1,
                'secret' => $secret
            ),
                'version' => 'latest',
                'region' => 'GET REGION'
        ));
        $FileName="$name.txt";
        $info = $client->doesObjectExist($bucket, $FileName);
        if ($info)
        {
            $pathToFile1="C:/data/$name.txt";
            $result = $client->getObject(array(
                'Bucket'     => $bucket,
                'Key'        => "$name.txt",
                'SaveAs' => $pathToFile1
            ));
            $file = fopen("C:/data/$name.txt","r");
            echo fread($file,filesize("C:/data/$name.txt"));
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
?>
