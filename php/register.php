<?php

    define('DB_HOST', 'uscitp.com');
    define('DB_NAME', 'smanoj_world_music');
    define('DB_USER','smanoj');
    define('DB_PASSWORD','yummy123');

    $con=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die("Failed to connect to MySQL: " . mysql_error());
    $db=mysql_select_db(DB_NAME,$con) or die("Failed to connect to MySQL: " . mysql_error());
    if (mysqli_connect_errno($con))
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    else
    {
        echo "Successfully connected to your database" . "</br></br>";
    }

    function NewUser()
    {
        $username = $_POST['username'];
        $password =  $_POST['password'];
        $query = "INSERT INTO Main_Table (username,password) VALUES ('$username','$password')";
        $data = mysql_query ($query)or die(mysql_error());
        if($data)
        {
            echo "Thank you for registering. Log in again with your information.";
        }
    }

    function SignUp()
    {
        if(!empty($_POST['username']))
        {
            $query = mysql_query("SELECT * FROM Main_Table WHERE username = '$_POST[username]'");
            if(!$row = mysql_fetch_array($query))
            {
                NewUser();
            }
            else
            {
                $existing = mysql_query("SELECT * FROM Main_Table WHERE username = '$_POST[username]' AND password = '$_POST[password]'");
                if(mysql_fetch_array($existing)){
                    echo "Thank you for logging in!";
                }
                else
                    echo "Username exists, but password is incorrect. Check again.";
            }
        }
    }
    if(isset($_POST['submit']))
    {
        SignUp();
    }
?>
