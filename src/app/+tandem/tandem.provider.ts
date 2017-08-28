import { Inject } from '@angular/core';
import { LionelProvider } from '../@lionel';
import { ILionelItem } from '../@lionel-db/tables/lionel-item.interface';

import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import 'rxjs/observable/forkJoin';

export class TandemProvider extends LionelProvider {
    public LionelItemIdByURL: { [url: string]: string; } = { };
    public URLs: Observable<Array<string>>;
    public inURLs: Array<string> = [];

    private noImages: string[] = ['pictures/lionel_identsubtitle.gif', 'pictures/blackbar.gif'];

    constructor( @Inject(Http) http: Http, urls?: Array<string>) {
        super(http);

        if (urls) {
            this.URLs = Observable.create(observer => {
                observer.next(urls);
                observer.complete();
            });
        } else {
            this.URLs = this.getUrls();
        }
    }

    public getTitle = (html: any): string => {
        // <font face="Arial" size="+1">LIONEL TRAINS LOCOMOTIVE No. 1654</font>
        return $('b font[face=Arial]', html).text();
    }

    public getDesc = (html: any): string => {

        //CategoryDescription
        return $('table', html)
            .toArray()
            .slice(5, -2)
            .map((t) => {
                return $(t).text();
            })
            .join('\n');
    };
    public getCategoryId = (html: any): number => {

        return null;
    }
    public getCategoryBySource = (html: any): string => {

        return $(html).filter('title').text();
    }
    public getLionelExternalId = (html: any): string => {
        return this.getTitle(html).split('.').slice(-1).pop().trim();
    }
    public getLionelPartId = (html: any): string => { return html.url; };

    public getEraId = (html: any): number => {
        return 1;
    };

    public getImages = (html: any): Array<string> => {
        const images: any[] = $('img', html).toArray();

        return images.filter((img) => {
            return Number($(img).attr('height')) > 60;
        })
        .map((img) => {
            return $(img).data('src');
        })
        .filter((img: string, index: number, self: string[]) => {
            return self.indexOf(img) === index;
        })
        .filter((img: string) => {
            const noImg: boolean = this.noImages.some((ni) => {return ni === img; });
            return img.startsWith('pictures') && !noImg;
        });
    }

    public mapForPage = (response): any => {

        let $html: any = $(response._body
            .replace(/src=/g, "data-src="));

        $html.skip = false;
        $html.url = decodeURIComponent(response.url.replace('http://localhost:3001/url/', ''));
        return $html;
    };

    private getUrls = (): Observable<Array<string>> => {

        return this.http
            .get('http://localhost:3001/url/'
            + encodeURIComponent(`http://www.tandem-associates.com/lionel/lionel_trains_master_index.htm`))
            .map(this.pasrseHtmlIndex);
    }

    private pasrseHtmlIndex  = (response): Array<string> => {

        let $html: any = $(response._body
            .replace(/src=/g, 'data-src='));
        console.log($html);
        let links: any[] = $('div table td a', $html)
            .toArray().map((a) => {
                const tandemURL: string = 'http://www.tandem-associates.com/lionel' + a['href'].replace('http://localhost:3000', '');
                const nextNode = a.nextSibling;
                let extraId = '';
                if (nextNode && nextNode.nodeType === 3) {
                    extraId = nextNode.nodeValue;
                }

                this.LionelItemIdByURL[tandemURL] = $(a).text() + extraId;

                return 'http://localhost:3001/url/'
                    + encodeURIComponent(tandemURL);
            }); // .slice(8, 35);

        return links;

    }
}

/*    
    public getImages = (html: any): Array<string> => {

        let ret = [];

        ret.push('http://ambrosebauer.com'
            + $('img[width="500"]', html).data('src'));

        let rawImgs = $('img[height="170"]', html)
            .get()
            .map((e) => {
            return 'http://ambrosebauer.com' + $(e).data('src');
            }).filter(url => {
                return (url.indexOf('/grey.gif') === -1);
            });

        return ret.concat(rawImgs);
  
    };
    */

