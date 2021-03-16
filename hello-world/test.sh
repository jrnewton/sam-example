#!/bin/bash

source .pwd

# Flow for newly created account
# 1. Sign in but get challenge back
## aws cognito-idp initiate-auth --region 'us-west-2' --auth-flow USER_PASSWORD_AUTH --client-id 5pnk763dmokos8jhhettta2dav --auth-parameters USERNAME=sam,PASSWORD="${PWD}"
# 2. Respond to challenge, passing back session id returned plus new password.  Make sure it complies with password rules.
## aws cognito-idp respond-to-auth-challenge --region 'us-west-2' --challenge-name NEW_PASSWORD_REQUIRED --client-id 5pnk763dmokos8jhhettta2dav \
##  --challenge-responses USERNAME=sam,NEW_PASSWORD="${PWD}" \
##  --session="AYABeL4Prl6_kFx8HqlMwTyoO60AHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMAS2Fybjphd3M6a21zOnVzLXdlc3QtMjowMTU3MzY3MjcxOTg6a2V5LzI5OTFhNGE5LTM5YTAtNDQ0Mi04MWU4LWRkYjY4NTllMTg2MQC4AQIBAHiLcRcG62Mb19KUM6qQUoajwNOF_-4FakXKLIP1RcBYjQHWBOvmCWQignYKaZZusiV7AAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM0VQelAT3vNOmi7f_AgEQgDtgI1IHnBe5lV6gJXN_aa13MIfjItijnKTMTFo5c2LxfFeNpZ_UhD_KePlL-avkJksUbRV5KtcYc-P4vwIAAAAADAAAEAAAAAAAAAAAAAAAAACx4pPY_unO_sincQ7rwReU_____wAAAAEAAAAAAAAAAAAAAAEAAADHV1ag-EITcWlgroOZZIVo_qBUpVODjXHsIN2jQRbzDoAGi13JODp1dB2M1PwYECnKbAP3zAL-oPK810t_8VA1QyZJNVQ-5ZZnwBJGPli9z0MUvD3Vl21ZaNbGtK_c6AGJ5O3rgqA3Ik_-nhpoKJelEHrBNP0KCAnzYJtkWdMwGA-0YV9w9Bm1GiQL50KWp4Xqo1HzCZqcV8Yg1Id2iK5RfiBsOsLg_XENr0FSYE_FOWVa0zpkAnh5FPV1mUuo3YclixuOJpzVHGsAfYqs4gsDYstgGJKBmJI"

# Flow for regular use
aws cognito-idp initiate-auth --region 'us-west-2' --auth-flow USER_PASSWORD_AUTH --client-id 5pnk763dmokos8jhhettta2dav --auth-parameters USERNAME=sam,PASSWORD="${PWD}"

# Get data 
idToken="eyJraWQiOiJ6dlhWQ1FJcWFic3NXYlNGbHFSbnZIT0dkdXZWQldPTGVWemtpUGR2RzZnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMjM0M2E1MS00MDI3LTQ5N2MtOWNhMi03ZTNjN2QwNzNlZjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfTUVBZUJyaVNCIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoic2FtIiwiYXVkIjoiNXBuazc2M2Rtb2tvczhqaGhldHR0YTJkYXYiLCJldmVudF9pZCI6IjlhZGI3MmRiLWI0Y2YtNGE0OC1hYTRjLWI3M2I0YWY1ZmY4ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjE1ODUyMzI5LCJwaG9uZV9udW1iZXIiOiIrMTYxNzY5NzM4MDQiLCJleHAiOjE2MTU4NTU5MjksImlhdCI6MTYxNTg1MjMyOSwiZW1haWwiOiJuZXd0QGhleS5jb20ifQ.oZB7Q3O-_tMcmlvWEr3fqY3_WhozIp2ERch4guUAFEf5N285TFtfdGcUYy-KZvkoG4mnvWN5J1KnFoI1NcLm5fduXAoKe05nOO5AO7jwWLTnuwxs3KEJztC7k4kmEfu9t_1mvcCWrP32UNwprvOeA1Qr6qfWYLEewr-QU7haaRiwpU816wmdvEHvpHMKnucIaG6USCr7k0Gdy2Pg7W6zGWaf8rrVgoFdoybr33AWLRhfYmKnOd-hctXVVPRTNiZSI_T7lheGqYMLop34Lj0GgF34g2z_l7UJdcJpznoq8mWRHOnEAaakcLkOWRK38VrOnyaEHFa2LHAHVtYML0tHpg"
accessToken="eyJraWQiOiIzUFZZOTRxcklVNVk0RVd5TFJkNFRodlBOU2dkZkhVSHI2Qm95UFBvcVN3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMjM0M2E1MS00MDI3LTQ5N2MtOWNhMi03ZTNjN2QwNzNlZjMiLCJldmVudF9pZCI6IjlhZGI3MmRiLWI0Y2YtNGE0OC1hYTRjLWI3M2I0YWY1ZmY4ZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTU4NTIzMjksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX01FQWVCcmlTQiIsImV4cCI6MTYxNTg1NTkyOSwiaWF0IjoxNjE1ODUyMzI5LCJqdGkiOiIyOGZkZDM3Ni1jMjNlLTQ1NTctYWFjZS1kNjBiYTA0ZWEwNjMiLCJjbGllbnRfaWQiOiI1cG5rNzYzZG1va29zOGpoaGV0dHRhMmRhdiIsInVzZXJuYW1lIjoic2FtIn0.lJmTvNJvA9un_IN-niZ_07c8XmzNHsteOpGRfM18Ra--vmeisZdLIw7behdjb4afnWwx78OK6OIh-3Mo_OFyTVmsMPySwtuBWyFgEpxb5t7bbaUegu8CDUCY4pOO34Up82uGmD-ZHaBoo9tdh80YChhtkpj3m2K1w-hhVn8p2XXPQdJeohUE0swmn0a4taLFDEWhpj0P-a9hRoI2Tw0a56pu9m-C8plspiAv7jIuuu_VUSN4kXJOJLuJ1K_9CYpopSIEiLtHBEyZuKq3jokulrdqu6UvO2hjmz47YRWAAjARajVckUCALhfYojD1FDEMnUJ17DffVoWVA5fpBqqzig"
curl -i -H "Authorization: ${idToken}" https://3gzntocwxl.execute-api.us-west-2.amazonaws.com/test/list?accessToken=${accessToken}
