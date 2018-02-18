Upload this code into a DragonBoard 410c.

INSTALL
=======

```bash
$ pip install -r requirements.txt
$ sudo apt-get install python-opencv
```

RUN
===

```bash
./ngrok http -log stdout -log-level debug -log-format term 5001 > ngrok.log &
```

RUN
===

```bash
FLASK_APP=app.py flask run --host 0.0.0.0
```