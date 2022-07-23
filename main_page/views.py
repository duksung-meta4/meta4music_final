from django.shortcuts import render

# Create your views here.
def home_view(request):
    return render(request, 'main_page/home.html')

def drawing_view(request):
    return render(request, 'main_page/drawing.html')


def playing_view(request):
    return render(request, 'main_page/playing.html')