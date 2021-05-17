import * as cheerio from "cheerio";
import { API } from "./api";

export class Client {
  private DOMAIN = "https://lnmtl.com/";
  private NOVEL_LIST_URL = `/novel`;

  public async getNovelList(
    orderBy: string,
    order: string,
    filter: string,
    page: number
  ) {
    const html = await API.get(this.NOVEL_LIST_URL).then((res) => res.data);
    const $ = cheerio.load(html);

    const novelList = $("div.media").map((_i, novelHtml) => {
      const [categories, tags] = $(".list-inline.text-center", novelHtml)
        .map((_i, el) => {
          return $("li", el).map((_i, e) => $(e).text().toString());
        })
        .toArray();

      return {
        title: $("h4.media-title", novelHtml).text(),
        image: $("img", novelHtml).attr("src"),
        author: $("span.label.label-primary", novelHtml).text(),
        desc: "",
        categories: categories.toArray(),
        tags: tags.toArray(),
      };
    });

    console.log(novelList.toArray());
  }
}
