
(function(){

    var Sumatorias = function (element, options) {
      this.$element    = $(element);
      this.options     = options;
      
      var self = this;
      this.sumatoria =  0;

      console.log(2);
      this.$element.find('tbody').bind("DOMSubtreeModified", function(e){

        console.log(e);
        
        self.actualizar_sumatoria();

      });

      this.crea_renglon_inferior();

      this.actualizar_sumatoria();

     }

    Sumatorias.DEFAULTS = {

        cols: [0,1,2,3,4,5,6,7,8,9]


    }

    Sumatorias.prototype.isFloat = function(n){
        return Number(n) === n && n % 1 !== 0;
    }

    Sumatorias.prototype.sumatoria_columna = function( columna ){

        var tds = this.renglon_inferior.find('td');
        var self = this;

        var trs = this.$element.find('tbody tr');


        var sumatoria = 0 ;
        var clases =  null;



        trs.each( function(i,v){

            var tr = $(v);

            var tds = tr.find('td');

            tds.each(function(i,v){

                var td = $(v);
                if( i == columna ){
                    console.log( parseFloat( td.html() ) );
                    var cadena = td.html();
                    cadena = cadena.replace('$',"");
                    cadena = cadena.replace(',',"");

                    if( td.hasClass('td_moneda') ){
                        clases = "td_moneda";

                    }
                    sumatoria += parseFloat(cadena);

                }
            });

        });


        tds.each(function(i,v){


            if( i == columna && !isNaN(sumatoria)  ){
                var signo = "";

                

                if( self.isFloat(sumatoria) ){
                    $(v).html( signo +  sumatoria.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') );
                }else{
                    $(v).html( signo + sumatoria);
                }
                $(v).css('text-align','right');
            }
                

        });

    }

    Sumatorias.prototype.actualizar_sumatoria = function(){

    
        
        var self = this;
        $.each( this.options.cols ,  function(i,v){

            self.sumatoria_columna(v);



        });


    }

    Sumatorias.prototype.crea_renglon_inferior = function(){

        // busco la cantidad th

        var th = this.$element.find('th');


        this.renglon_inferior = $('<tfoot></tfoot>');

        var self = this;

        var tr = $('<tr></tr>');


        th.each(function(i,v){

            
            var td = $("<td></td>");

            tr.append( td  );


        })
        this.renglon_inferior.append(tr);


        this.$element.append(this.renglon_inferior);



    }



     function Plugin(option) {
        return this.each(function ( index ) {
          var $this   = $(this);
          var data    = $this.data('wp.sumatorias');

         
          var options = $.extend({}, Sumatorias.DEFAULTS, $this.data(), typeof option == 'object' && option);
          

          if (!data){ 
           
            $this.data('wp.avaluos', (data = new Sumatorias(this, options)) );
        
          }else{
            console.log("ya existe");
          }

            

        })
    }

    $.fn.sumatorias = Plugin ;
    $.fn.sumatorias.Constructor = Sumatorias;


})();

$('table').sumatorias();