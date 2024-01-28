from bs4 import BeautifulSoup
import threading
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

soups = {}
url = ""
pages = {"Foxnews":"https://www.foxnews.com/search-results/search?q=",
         "The New York Post":"https://nypost.com/search/",
         "New York Times":"https://www.nytimes.com/search?query=",
         "ABC":"https://abcnews.go.com/search?searchtext="}
def open_url(station, url):
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(options=chrome_options)


    driver.get(url)
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    soups[station] = soup

def get_data(keyword):
    threads = {}

    for station, page in pages.items():
        url = page + keyword
        t = threading.Thread(target=open_url, args=(station, url))
        threads[station] = t
        t.start()

    for station, thread in threads.items():
        thread.join()

    js_dict = {}
    ai_dict = {}
    for station, soup in soups.items():
        t = []
        c = []
        a = []
        if station == "Foxnews":
            titles = soup.find_all("h2", class_="title")
            for i in titles:
                title = i.text
                link = None
                try:
                    b = str(i)
                    link = b[27:b.index("target")-2]
                except:
                    pass
                if link != None:
                    t.append(title)
                    a.append(link)

            content = soup.find_all("p", class_="dek")
            link = soup.find_all("a", )

            for i in x:
                i = i.text.replace("\n", "")
                i = i.replace("\t", "")
                c.append(i)

        elif station == "The New York Post":
            #title and link
            titles = soup.find_all("h3", class_="story__headline headline headline--archive")
            for i in titles:
                title = i.text
                link = None
                try:
                    b = str(i)
                    c = BeautifulSoup(b, "html.parser")
                    x = c.find_all("a")
                    x = str(x)
                    link = x[x.index("href") + 6:x.index(">") -1]
                except:
                    pass

                if link != None:
                    link = link.replace("\t", "")
                    link = link.replace("\n", "")
                    link = link.replace("'", "")
                    title = title.replace("\t", "")
                    title = title.replace("\n", "")
                    title = title.replace("'", "")

                    t.append(title)
                    a.append(link)

            #content
            x = soup.find_all("p", class_="story__excerpt body")
            info = []
            for i in x:
                i = str(i.text)
                txt = i.replace("\t", "")
                txt = txt.replace("\n", "")
                info.append(txt)
            c = info

        elif station == "New York Times":
            #title and links
            titles = soup.find_all("h4", class_="css-2fgx4k")
            links = soup.find_all("div", "css-e1lvw9")
            for i in titles:
                t.append(i.text)
                link = None

            for l in links:
                try:
                    l = str(l)
                    x = BeautifulSoup(l, "html.parser")
                    q = x.find_all("a")
                    q =str(q)
                    link = q[q.index("href") + 6:q.index(">") -1]
                    a.append("https://www.nytimes.com" + link)
                except:
                    pass
            #content
                
            x = soup.find_all("p", class_="css-16nhkrn")
            for i in x:
                c.append(i.text)
        elif station == "ABC":
            #title and links
            titles_html = soup.find_all("div", class_="ContentRoll__Headline")
            titles_html = str(titles_html)
            sub_titles = BeautifulSoup(titles_html, "html.parser")
            links = sub_titles.find_all("a")
            titles = sub_titles.find_all("h2")

            for i in titles:
                t.append(i.text)

            for l in links:
                try:
                    q = str(l)
                    link = q[q.index("href") + 6:q.index("tabindex") -2]
                    a.append(link)
                except:
                    pass

            #content
            x = soup.find_all("div", class_="ContentRoll__Desc")
            for i in x:
                c.append(i.text)
        
        ai_dict[station] = [t, c]
        js_dict[station] = [[], t, c, a]
    return (ai_dict, js_dict)








