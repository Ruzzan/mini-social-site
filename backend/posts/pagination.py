from rest_framework.pagination import PageNumberPagination

class PostPagination(PageNumberPagination):
    page_size = 5
    max_page_size = 8
    page_query_param = 'p'
    page_size_query_param = 'page_size'