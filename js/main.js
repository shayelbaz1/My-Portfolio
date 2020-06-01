'use strict'

$(document).ready(init);

function init() {
  renderPortfolio()
  renderModals()
}

function renderPortfolio() {
  var projects = getProjects()
  var strHtmls = projects.map(function (proj, idx) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        
        <img class="img-thumbnail radius-7" src="img/portfolio/${proj.id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>
        `
  })
  $('.portfolio-items').html(strHtmls.join(''))
}


function renderModals() {
  var projects = getProjects()
  var strHtmls = projects.map(function (proj, idx) {
    return `
        <div class="portfolio-modal modal fade" id="portfolioModal${idx}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->

                  <h2>${proj.name}</h2>
                  <p class="item-intro text-muted">${proj.title}</p>
                  <a href="${proj.url}" target="_block">
                  <img class="img-fluid d-block mx-auto radius-7" src="img/portfolio/${proj.id}.jpg" alt=""></a>
                  <p>${proj.des}</p>
                  <ul class="list-inline">
                    <li>Date: ${proj.date}</li>
                    <li>Developer: Shay Elbaz</li>
                  </ul>
                  <button class="btn btn-danger" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    </button>
                    <a href="${proj.git}" target="_blank target="_blank">
                    <button class="btn btn-dark" type="button">
                      <i class="fa fa-git"></i>
                      </button>
                      </a>
                      <a href="${proj.url}" target="_block">
                  <button class="btn btn-success" type="button">
                    <i class="fa fa-link"></i>
                    Run Project</button>
                    </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  })

  $('.modals').html(strHtmls.join(''))
}

function onSend() {
  var name = $('.name').val()
  var email = $('.email').val()
  var message = $('.message').val()
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=shaysha6@gmail.com&su=${name}&body=${message}`);
}