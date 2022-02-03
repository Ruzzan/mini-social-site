from rest_framework.pagination import PageNumberPagination

class PostPagination(PageNumberPagination):
    page_size = 12
    max_page_size = 15
    page_query_param = 'p'
    page_size_query_param = 'page_size'