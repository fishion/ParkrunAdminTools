javascript:(function(){
    if (!window.jQuery) {
        script = document.createElement( 'script' );
        script.src='https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js';
        script.onload=pulldata;
        document.body.appendChild(script);
    } else {
        pulldata();
    }
    function pulldata(){
        let data = [];
        let rows = jQuery('#rosterstatetable tr');
        rows.each(function(){
            let row = jQuery(this);
            let offset = row.find('td').size() == 3 ? -1 : 0;
            data.push({
                role : row.find('td:nth-child('+ (3 + offset) +') span').text(),
                name : row.find('td:nth-child('+ (2 + offset) +') strong').text(),
                id: row.find('td:nth-child('+ (1 + offset) +') span').text()
            })
        });
        drawdata(data)
    }
    function drawdata(data){
        let marshalcount = data.filter((el)=>el.role=='Marshal').length;
        let html = 
            wrap('html',
                wrap('head',
                    wrap('title', 'parkrun roster')+
                    wrap ('style',
                        '* {font-family:arial, sans-serif}' +
                        'h1 {text-align: center}' +
                        'table {border-collapse:collapse; width: 100%}' +
                        'table td {border:1px solid black}'
                    )
                ) +
                wrap('body',
                    wrap('h1', 'parkrun volunteer roster') +
                    wrap('table',
                        data.reduce((html, el)=>{
                            let marshalnumber = el.role == 'Marshal' ? ' ' + marshalcount-- : '';
                            if (el.role == 'Other') el.role = 'Faulty Barcode Checker'; 
                            return html + wrap('tr',
                                wrap('td', el.role + marshalnumber) + wrap('td', el.name) + wrap('td', el.id)
                            )
                        }, '')
                    )
                )
            );
        var tab = window.open('about:blank', '_blank');
        tab.document.write(html);
        tab.document.close();
    }
    function wrap(tag, content){
        return '<'+tag+'>'+content+'</'+tag+'>';
    }
})()