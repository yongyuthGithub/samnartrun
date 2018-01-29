<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">




        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            .w3-sidebar a {font-family: "Roboto", sans-serif}
            body,h1,h2,h3,h4,h5,h6,.w3-wide {font-family: "Montserrat", sans-serif;}
        </style>
    <body >



        <title>เข้าสู่ระบบ</title>
        <div class="container">
            <div class="row">
                <div class="col-sm">

                </div>
                <div class="col-sm-5">
                    <div class="row">
                        <div class="col-sm-9">
                            <center><h2>เข้าสู่ระบบ</h2></center>
                            <div class="col align-self-center">
                                <form action="home.php" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">อีเมล</label>
                                        <input type="email" class="form-control" id="email" placeholder="ใส่อีเมล" value="<?php echo $txtemail; ?>">

                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">รหัสผ่าน</label>
                                        <input type="password" class="form-control" id="pword" placeholder="ใส่รหัสผ่าน">
                                    </div>


                                    <div>
                                        <button type="submit" class="btn btn-default btn-sm">เข้าสู่ระบบ</button>
                                        <!-- Trigger the modal with a button -->
                                        <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">ลืมรหัสผ่าน</button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="myModal" role="dialog">
                                            <div class="modal-dialog modal-sm">
                                                <div class="modal-content">
                                                    <div class="modal-header">

                                                        <h4 class="modal-title">กรุณาใส่อีเมล</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" id="recipient-name"  placeholder="อีเมลที่ลืมรหัส..">
                                                        </div></p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary">ส่งอีเมล</button>
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">ออก</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <br>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">

                </div>
                <script>
                    // Accordion 
                    function myAccFunc() {
                        var x = document.getElementById("demoAcc");
                        if (x.className.indexOf("w3-show") == -1) {
                            x.className += " w3-show";
                        } else {
                            x.className = x.className.replace(" w3-show", "");
                        }
                    }

                    // Click on the "Jeans" link on page load to open the accordion for demo purposes
                    document.getElementById("myBtn").click();


                    // Script to open and close sidebar
                    function w3_open() {
                        document.getElementById("mySidebar").style.display = "block";
                        document.getElementById("myOverlay").style.display = "block";
                    }

                    function w3_close() {
                        document.getElementById("mySidebar").style.display = "none";
                        document.getElementById("myOverlay").style.display = "none";
                    }
                </script>


                <!-- Optional JavaScript -->
                <!-- jQuery first, then Popper.js, then Bootstrap JS -->
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
                </body>
                </html>