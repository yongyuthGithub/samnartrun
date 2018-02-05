<!DOCTYPE html>
<html lang="en">
    <head>

        <title>บริษัท พราว</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <?php echo css_asset('master/_site.css') ?>
        <?php echo css_asset('master/jquery.dataTables.min.css') ?>
        <?php echo css_asset('master/responsive.dataTables.min.css') ?>
        <?php echo css_asset('master/bootstrap-select.min.css') ?>
        <?php echo css_asset('master/checkbox_radiobox.css') ?>

        <?php echo js_asset('master/jquery.cookie.js') ?>
        <?php echo js_asset('master/linq.min.js') ?>
        <?php echo js_asset('master/formValidation.min.js') ?>
        <?php echo js_asset('master/bootstrap_validation.js') ?>
        <?php echo js_asset('master/jquery.dataTables.min.js') ?>
        <?php echo js_asset('master/dataTables.responsive.min.js') ?>
        <?php echo js_asset('master/bootstrap-dialog.min.js') ?>
        <?php echo js_asset('master/bootstrap-select.min.js') ?>
        <?php echo js_asset('master/jBootstrap-dialog.js') ?>
        <?php echo js_asset('master/jquery.cookie.js') ?>
        <?php echo js_asset('master/loadingoverlay.min.js') ?>
        <?php echo js_asset('master/loadingoverlay_progress.min.js') ?>
        <?php echo js_asset('master/jCustomPageMain.js') ?>
        <?php echo js_asset('master/jCommon.js') ?>
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
                    <a class="navbar-brand" href="<?php echo base_url('home/index') ?>">Logo</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav navbar-right">
<!--                        <li><a href="<?php echo base_url('home/index') ?>"><i class="fa fa-home" style="font-size:24px"></i>HOME</a></li>-->
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="line-height: 26px;font-size: 140%;"><i class="fa fa-desktop" style="font-size:100%;min-width: 30px;"></i>Transition
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#"><i class="fa fa-file-word-o" style="font-size:100%;min-width: 30px;"></i>Recordings</a></li>
                                <li><a href="#"><i class="fa fa-flask" style="font-size:100%;min-width: 30px;"></i>Add fuel to the pump.</a></li>
                                <li><a href="#"><i class="fa fa-line-chart" style="font-size:100%;min-width: 30px;"></i>Other income</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="line-height: 26px;font-size: 140%;"><i class="fa fa-puzzle-piece" style="font-size:100%;min-width: 30px;"></i>Master
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="<?php echo base_url('register/index') ?>"><i class="fa fa-users" style="font-size:100%;min-width: 30px;"></i>Employee Information</a></li>
                                <li><a href="<?php echo base_url('car/index') ?>"><i class="fa fa-car" style="font-size:100%;min-width: 30px;"></i>Car information</a></li>
                                <li><a href="<?php echo base_url('insurance/index') ?>"><i class="fa fa-paste" style="font-size:100%;min-width: 30px;"></i>Insurance company information</a></li>                                
                                <li><a href="<?php echo base_url('customer/index') ?>"><i class="fa fa-user-o" style="font-size:100%;min-width: 30px;"></i>Company Profile</a></li>
                                <li><a href="<?php echo base_url('Fule/index') ?>"><i class="fa fa-tint" style="font-size:100%;min-width: 30px;"></i>Oil pump information</a></li>
                                <li><a href="#"><i class="fa fa-dashboard" style="font-size:100%;min-width: 30px;"></i>Prefix information</a></li>
                            </ul>
                        </li>

                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="line-height: 26px;font-size: 140%;"><i class="fa fa-cogs" style="font-size:100%;min-width: 30px;"></i>Setting
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#"><i class="fa fa-tasks" style="font-size:100%;min-width: 30px;"></i>Menu</a></li>
                                <li><a href="#"><i class="fa fa-unlock-alt" style="font-size:100%;min-width: 30px;"></i>Pemission</a></li>
                                <li><a href="<?php echo base_url('Admin/index') ?>"><i class="fa fa-user-circle" style="font-size:100%;min-width: 30px;"></i>Account</a></li>                                
                            </ul>
                        </li>
                </div>
        </nav>
        <!-- Page content -->
        <div class="container" style="margin-top: 80px;">
            <?php $this->load->view($page); ?>
        </div>

        <script>
            $(document).ready(function () {
                // Initialize Tooltip
                $('[data-toggle="tooltip"]').tooltip();

                // Add smooth scrolling to all links in navbar + footer link
                $(".navbar a, footer a[href='#myPage']").on('click', function (event) {

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
                        }, 900, function () {

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            window.location.hash = hash;
                        });
                    } // End if
                });
            })
        </script>
        <form id="form_sumbit" style="display: none;" method="post"></form>
        <input type="hidden" id="hidUrl" value="<?php echo base_url(); ?>"/>
    </body>
</html>
