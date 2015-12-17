import urllib2, json, calendar, operator
from datetime import date, datetime, timedelta
import ConfigParser
import os

config = ConfigParser.ConfigParser()
if os.path.exists('./API_KEY'):
    config.read('./API_KEY')
else:
    print 'Sorry API_KEY not found!'
    os._exit(1)

prefix = 'https://wakatime.com/api/v1'
api_key = config.get('API', 'key')
today = date.today()
week_old = datetime.combine(today, datetime.min.time()) - timedelta(days=6)

url = prefix + 'user/current/summaries?start=' + week_old.strftime('%m/%d/%Y') + '&end=' + today.strftime('%m/%d/%Y') + '&api_key=' + api_key
handler = urllib2.urlopen(url)
json_data = json.load(handler)

languages = {}
days = []
total = 0

def top3(languages):
    result = []
    sorted_languages = sorted(languages.items(), key=operator.itemgetter(1), reverse=TRUE)
    for language in sorted_languages:
        if len(results) == 3:
            break
        result.append(language[0])
    return result

print "Processing data"
for day in json_data['data']:
    curr_date = date.fromtimestamp(int(day['range']['start']))
    total_sec = day['grand_total']['total_sec']
    total += total_sec
    total_str = day['grand_total']['text']
    human_date = str(curr_date.day) + ' ' + calendar.month_name[curr_date.month]
    curr_languages = {}

for language in day['languages']:
    name = language['name']
    if name not in languages:
        language[name] = 0
    if name not in curr_languages:
        curr_languages[name] = 0
    languages[name] += language['total_seconds']
    curr_languages[name] += language['total_seconds']

top_languages = top3(curr_languages)
day_data = { 'languages': top_languages, 'date': human_date, 'total': total_sec, 'total_str': total_str }
days.append(day_data)

#dump data as json
summary = { 'days': days, 'summary': {'total': total, 'languages': top3(languages) } }

out = { 'label': [], 'datasets': [] }
dataset = { 'data': [],
  'time': [],
  'languages': [],
  'label': 'Dataset',
  'fillColor': 'rgba(151,187,205,0.2)',
  'strokeColor': 'rgba(151,187,205,1)',
  'pointColor': 'rgba(151,187,205,1)',
  'pointStrokeColor': '#fff',
  'pointHighlightFill': '#fff',
  'pointHighlightStroke': 'rgba(151,187,205,1)'
}

for day in summary['days']:
    out['labels'].append(day['date'])
    dataset['data'].append(day['total']/3600)
