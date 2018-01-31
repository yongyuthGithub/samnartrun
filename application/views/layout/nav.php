<!DOCTYPE html>
<html lang="en">
<head>
   
  <title>Bootstrap Theme The Band</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  
  
  
  .navbar {
      font-family: Montserrat, sans-serif;
      margin-bottom: 0;
      background-color: #2d2d30;
      border: 0;
      font-size: 11px !important;
      letter-spacing: 4px;
      opacity: 0.9;
  }
  .navbar li a, .navbar .navbar-brand { 
      color: #d5d5d5 !important;
  }
  .navbar-nav li a:hover {
      color: #fff !important;
  }
  .navbar-nav li.active a {
      color: #fff !important;
      background-color: #29292c !important;
  }
  .navbar-default .navbar-toggle {
      border-color: transparent;
  }
  .open .dropdown-toggle {
      color: #fff;
      background-color: #555 !important;
  }
  .dropdown-menu li a {
      color: #000 !important;
  }
  .dropdown-menu li a:hover {
      background-color: red !important;
  }
  
  </style>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="50">

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#myPage">Logo</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="<?php echo base_url('home/index') ?>"><i class="fa fa-home" style="font-size:24px"></i>HOME</a></li>
       <li><a href="#tour"><i class="fa fa-newspaper-o" style="font-size:24px"></i>ใบงาน</a></li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-user-circle" style="font-size:24px"></i>Admin
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
              <li><a href="#"><i class="fa fa-users" style="font-size:24px"></i>ข้อมูลพนักงาน</a></li>
              <li><a href="<?php echo base_url('car/index') ?>"><i class="fa fa-car" style="font-size:24px"></i>ข้อมูลรถ</a></li>
            <li><a href="#"><i class="fa fa-paste" style="font-size:24px"></i>ประกันรถ</a></li>
            <li><a href="#"><i class="fa fa-user-circle" style="font-size:24px"></i>Admin</a></li>
              <li><a href="#"><i class="fa fa-user-o" style="font-size:24px"></i>ข้อมูลูกค้า</a></li>
                <li><a href="#"><i class="fa fa-list-alt" style="font-size:24px"></i>รายรับ</a></li>
                  <li><a href="#"><i class="fa fa-list-alt" style="font-size:24px;color:red"></i>รายจ่าย</a></li>
                  <li><a href="#"><i class="fa fa-tint" style="font-size:24px"></i>เพิ่มน้ำมัน</a></li>
                  <li><a href="<?php echo base_url('Fule/index') ?>"><i class="fa fa-tint" style="font-size:24px;color:greenyellow"></i>ข้อมูลน้ำมัน</a></li>
                  
            
          </ul>
        </li>
        
  </div>
</nav>
  <!-- Page content -->
        <div class="container" style="margin-top: 80px;">
            <div class="row">
                <?php $this->load->view($page);?>
            </div>
        </div>

<script>
$(document).ready(function(){
  // Initialize Tooltip
  $('[data-toggle="tooltip"]').tooltip(); 
  
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
})
</script>

</body>
</html>
