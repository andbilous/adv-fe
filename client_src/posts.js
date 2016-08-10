$( document ).ready( function () {
    var posts = Data.getPosts();

    var selectedPage = 0;
    var perPage = 13;

    var postTemplateRaw = $('#post-preview-template').html();
    var postsTemplateRaw = $('#posts-list-template').html();
    var navigationTemplateRaw = $('#navigation-template').html();
    var postsJsonTemplateRaw = $('#posts-json-template').html();
    var postsTableTemplateRaw = $('#posts-table-template').html();
    var postTemplate = Handlebars.compile(postTemplateRaw);
    var postsTemplate = Handlebars.compile(postsTemplateRaw);
    var navigationTemplate = Handlebars.compile(navigationTemplateRaw);
    var postsJsonTemplate = Handlebars.compile(postsJsonTemplateRaw);
    var postsTableTemplate = Handlebars.compile(postsTableTemplateRaw);

    Handlebars.registerPartial('post-preview', postTemplateRaw);
    
    Handlebars.registerHelper('bold', function (options) {
        return new Handlebars.SafeString('<b>' + 
                Handlebars.Utils.escapeExpression(options.hash.text) + '</b>'
        );
    });
    Handlebars.registerHelper('json', function(options){
    		document.write('<pre>' +JSON.stringify({options}, null,1)+'</pre>');
     
        ;		
    });
    Handlebars.registerHelper('table',function())
    {
    	document.write('<i>' +this.description)+'</i>');
    }
    Handlebars.registerHelper('nav', function (options) {
        return Array.apply(null, Array(options.hash.count)).map(function(v,i) {
            return options.fn({
                number: i + 1,
                selected: options.hash.selected == i 
            });
        }).join('');
    });

    render();
    subscribeHandlers();

    function render() {
        renderPosts();
        renderNavigation();
        renderJson();
     //   renderStrippedTable();
    }
   
    function subscribeHandlers() {
        $( '.posts-container__navigation' ).click( function( event ) {
            var selected = parseInt($(event.target).data('id')) - 1;

            if ( selected === selectedPage ) {
                return;
            }
            selectedPage = selected;
            renderPosts();
            renderNavigation();
            $( 'html,body' ).animate( { scrollTop : 0 }, 0 );
        });

        $( '.posts-container__post' ).click( function () {
            console.log( 'selected post' );
        } );
    }

    function renderNavigation() {
        var count = Math.ceil( posts.length / perPage );

        $( '.posts-container__navigation' ).html(navigationTemplate({
            count: count,
            selected: selectedPage
        }));
    }

    function renderPosts() {
        var postsForRender = posts.slice( selectedPage * perPage, selectedPage * perPage + perPage );
        html= postsTemplate(
           {posts: postsForRender}
        );

        jQuery('.posts-container__list').html(html);
    }
    function renderJson(){
    
       
        	 var postsForRender = posts.slice( selectedPage * perPage, selectedPage * perPage + perPage );
        html= postsTableTemplate(
           {
           posts : postsForRender
           }
        );
    
    }
    
    function renderStrippedTable(){
    	 var postsForRender = posts.slice( selectedPage * perPage, selectedPage * perPage + perPage );
        html= postsJsonTemplate(
           {
           posts : postsForRender
           }
        );
    }
});
