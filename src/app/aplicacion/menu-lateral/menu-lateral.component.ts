import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styles: []
})
export class MenuLateralComponent implements OnInit {
  // @ViewChild('menuPerfil', {static : true}) menuPerfil: ElementRef;
  // iconoPerfil = 'arriba';

  // Variables Plantilla

  private $BODY;
  private $MENU_TOGGLE;
  private $SIDEBAR_MENU;
  private $SIDEBAR_FOOTER;
  private $LEFT_COL;
  private $RIGHT_COL;
  private $NAV_MENU;
  private $FOOTER;


  // Variables componente
  @Input() usuario: Usuario;
  public menu: any;



  constructor() { }

  // cambiaEstado(idMenu: string) {
  //   // console.log(this.iconoPerfil);

  //   let campo: any;

  //   if (this.iconoPerfil === 'abajo') {
  //     this.iconoPerfil = 'arriba';
  //     campo = document.getElementById(idMenu);
  //     campo.className = 'fa fa-chevron-down';
  //     return;
  //   }

  //   this.iconoPerfil = 'abajo';
  //   campo = document.getElementById(idMenu);
  //   campo.className = 'fa fa-chevron-up';
  //   // console.log(this.iconoPerfil);

  // }

  ngOnInit() {
    this.menu = this.usuario.menu;
    // console.log('menu', this.menu);
  }

  
  // anchorClicked(event: MouseEvent) {
  //   let target = event.srcElement.id;

  //   let $li = $('#' + target.replace('chevron', 'li')).parent();

  //   if ($li.is('.active')) {
  //     $li.removeClass('active active-sm');
  //     $('ul:first', $li).slideUp(function() {});
  //   } else {
  //     // prevent closing menu if we are on child menu
  //     if (!$li.parent().is('.child_menu')) {
  //       $('#sidebar-menu')
  //         .find('li')
  //         .removeClass('active active-sm');
  //       $('#sidebar-menu')
  //         .find('li ul')
  //         .slideUp();
  //     }

  //     $li.addClass('active');

  //     $('ul:first', $li).slideDown(function() {});
  //   }
  // }

  plot() {
    // console.log('in sidebar');

    this.$BODY = $('body');
    this.$MENU_TOGGLE = $('#menu_toggle');
    this.$SIDEBAR_MENU = $('#sidebar-menu');
    this.$SIDEBAR_FOOTER = $('.sidebar-footer');
    this.$LEFT_COL = $('.left_col');
    this.$RIGHT_COL = $('.right_col');
    this.$NAV_MENU = $('.nav_menu');
    this.$FOOTER = $('footer');

    let $a = this.$SIDEBAR_MENU.find('a');
    this.$SIDEBAR_MENU.find('a').on('click', function(ev) {
      let $li = $(this).parent();

      if ($li.is('.active')) {
        $li.removeClass('active active-sm');
        $('ul:first', $li).slideUp(function() {
          this.setContentHeight();
        });
      } else {
        // prevent closing menu if we are on child menu
        if (!$li.parent().is('.child_menu')) {
          this.$SIDEBAR_MENU.find('li').removeClass('active active-sm');
          this.$SIDEBAR_MENU.find('li ul').slideUp();
        }

        $li.addClass('active');

        $('ul:first', $li).slideDown(function() {
          this.setContentHeight();
        });
      }
    });

    // toggle small or large menu
    this.$MENU_TOGGLE.on('click', function() {
      if (this.$BODY.hasClass('nav-md')) {
        this.$SIDEBAR_MENU.find('li.active ul').hide();
        this.$SIDEBAR_MENU
          .find('li.active')
          .addClass('active-sm')
          .removeClass('active');
      } else {
        this.$SIDEBAR_MENU.find('li.active-sm ul').show();
        this.$SIDEBAR_MENU
          .find('li.active-sm')
          .addClass('active')
          .removeClass('active-sm');
      }

      this.$BODY.toggleClass('nav-md nav-sm');

      this.setContentHeight();
    });
  }

  setContentHeight() {
    // reset height
    this.$RIGHT_COL.css('min-height', $(window).height());

    const bodyHeight = this.$BODY.outerHeight();
    const footerHeight = this.$BODY.hasClass('footer_fixed') ? -10 : this.$FOOTER.height();
    const leftColHeight = this.$LEFT_COL.eq(1).height() + this.$SIDEBAR_FOOTER.height();
    let contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= this.$NAV_MENU.height() + footerHeight;

    this.$RIGHT_COL.css('min-height', contentHeight);
  }

}
