multipart-upload-test
---------------------

S3 multipart upload test: uploads a **single file** by generating **presigned URLs** for each part and invoking **PUT requests**.

Performs both **sequential uploading** of parts **using buffers** as well as **parallel uploading** of parts **using streams** with **adjustable concurrency**.

Test shows both **client computed MD5** values as well **S3 computed part ETags**, and same for the **final object ETag**.

**NOTE**: an ETag, per [RFC 7232](https://tools.ietf.org/html/rfc7232#section-2.3), is a **quoted string**.

## Usage

Install Node.js dependencies by running "`npm install`".

Make sure "`index.js`" is an executable by running "`chmod +x ./index.js`" if necessary.

Edit "`settings.js`" before running as the file to upload is intentionally excluded from this project.
Alternatively, you can specify an **optional filename** after "`./index.js`".

```bash
$ ./index.js | tee upload.log

   File Size: 324611902
   Part Size: 10485760
 Total Parts: 31
   Upload ID: DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC
-------------
 Part 1  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014043Z&X-Amz-Expires=3600&X-Amz-Signature=c6736e5b029ba78c7d8ac6d805d59b9afe32f5654a1520c755b8ea24223c4bba&X-Amz-SignedHeaders=host&partNumber=1&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 1  MD5: "f701d518437317492a2d04bf900411eb"
 Part 1 ETag: "f701d518437317492a2d04bf900411eb"
-------------
 Part 2  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014059Z&X-Amz-Expires=3600&X-Amz-Signature=696d83988fa88d2b9c331247b4a49a285b25a80cad76a2dc530d21468e7c7bb9&X-Amz-SignedHeaders=host&partNumber=2&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 2  MD5: "a1957c905656f93bf6ddf4101f31e482"
 Part 2 ETag: "a1957c905656f93bf6ddf4101f31e482"
-------------
 Part 3  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014116Z&X-Amz-Expires=3600&X-Amz-Signature=847f0b77a4e890032c4cc0e6e08815d58310d79fc6a5fab7d67b099404075b0a&X-Amz-SignedHeaders=host&partNumber=3&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 3  MD5: "1a0baaddd80d9fac53e30ae50f985fe2"
 Part 3 ETag: "1a0baaddd80d9fac53e30ae50f985fe2"
-------------
 Part 4  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014132Z&X-Amz-Expires=3600&X-Amz-Signature=58a8a4b29dba9fa33cbf68474571c4b95b67ad10dc09edc201521538e5fe1221&X-Amz-SignedHeaders=host&partNumber=4&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 4  MD5: "c412ac0d867167e95376fdcbf9f564c2"
 Part 4 ETag: "c412ac0d867167e95376fdcbf9f564c2"
-------------
 Part 5  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014148Z&X-Amz-Expires=3600&X-Amz-Signature=48cda21875aeb01e93406ff25bbeb9369c81cf1320b8cc833892a631b0f00b08&X-Amz-SignedHeaders=host&partNumber=5&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 5  MD5: "ab92459b2e5db873b0e7b1aed8a8300c"
 Part 5 ETag: "ab92459b2e5db873b0e7b1aed8a8300c"
-------------
 Part 6  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014205Z&X-Amz-Expires=3600&X-Amz-Signature=e0de629600d269a8ab4e1cee709263a307300fee6ce8e00b009412635aeeee56&X-Amz-SignedHeaders=host&partNumber=6&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 6  MD5: "c533e8b1c1a4399dd678c9d0dc40e244"
 Part 6 ETag: "c533e8b1c1a4399dd678c9d0dc40e244"
-------------
 Part 7  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014220Z&X-Amz-Expires=3600&X-Amz-Signature=52a2f66bd5f289de44e2bb829558fd1156cea39b6e19ddf571ee75da3e4d1571&X-Amz-SignedHeaders=host&partNumber=7&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 7  MD5: "ea4c08057c8ce972aedeff71746bcfd5"
 Part 7 ETag: "ea4c08057c8ce972aedeff71746bcfd5"
-------------
 Part 8  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014239Z&X-Amz-Expires=3600&X-Amz-Signature=2ece1ab64f3b5c8b5b7c2483b8e59795460141f69a5c72e5f6b951a0975cdf73&X-Amz-SignedHeaders=host&partNumber=8&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 8  MD5: "0e45c2e65ed5124349ead4dc2312857f"
 Part 8 ETag: "0e45c2e65ed5124349ead4dc2312857f"
-------------
 Part 9  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014255Z&X-Amz-Expires=3600&X-Amz-Signature=5503a883523a68f4c73972dfdd006ea9ecf27b00bd2377903c3cee1a643d7ff2&X-Amz-SignedHeaders=host&partNumber=9&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
 Part 9  MD5: "011afd18e851afd47d2fc48c4556ffe8"
 Part 9 ETag: "011afd18e851afd47d2fc48c4556ffe8"
-------------
Part 10  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014311Z&X-Amz-Expires=3600&X-Amz-Signature=8b699dd8078c3e9f4768423fe1e7716ec55e89fea429ff638f06a91e40acd2b8&X-Amz-SignedHeaders=host&partNumber=10&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 10  MD5: "f2bc2cb9559cd29b26f83701d782e117"
Part 10 ETag: "f2bc2cb9559cd29b26f83701d782e117"
-------------
Part 11  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014327Z&X-Amz-Expires=3600&X-Amz-Signature=a878891b23c870c6cac54c43396a8b9052ccaebe5ab424a8947b6dd8f10bcf88&X-Amz-SignedHeaders=host&partNumber=11&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 11  MD5: "9ff953cd3145709b92b34c433dd5821d"
Part 11 ETag: "9ff953cd3145709b92b34c433dd5821d"
-------------
Part 12  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014343Z&X-Amz-Expires=3600&X-Amz-Signature=36ae702a38258ed354b2402d2bd8f10c3796330e531a166a91f08863aaa9f044&X-Amz-SignedHeaders=host&partNumber=12&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 12  MD5: "a277222f461ef530d96ddb5a673c350f"
Part 12 ETag: "a277222f461ef530d96ddb5a673c350f"
-------------
Part 13  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014359Z&X-Amz-Expires=3600&X-Amz-Signature=f3f2d83861951a25dda9062f52f4243eecc3d323c21ce23a569686ffe9a20d6e&X-Amz-SignedHeaders=host&partNumber=13&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 13  MD5: "f5fc875dff5dca0ac6d8d4daebe12705"
Part 13 ETag: "f5fc875dff5dca0ac6d8d4daebe12705"
-------------
Part 14  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014416Z&X-Amz-Expires=3600&X-Amz-Signature=aa9f32a1bd4a0483c6b041b230ce3d53ca4ade6aa4ec9774b00f9b54bc361745&X-Amz-SignedHeaders=host&partNumber=14&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 14  MD5: "4deab7d65fc34a80ff635c80d33e108f"
Part 14 ETag: "4deab7d65fc34a80ff635c80d33e108f"
-------------
Part 15  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014434Z&X-Amz-Expires=3600&X-Amz-Signature=84651059126e5e4272f354d87fa705c40cd9050d9b68d78eb308a2577f0818ab&X-Amz-SignedHeaders=host&partNumber=15&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 15  MD5: "5af1cbeb9913e8b856b99a3e6ca0e8e9"
Part 15 ETag: "5af1cbeb9913e8b856b99a3e6ca0e8e9"
-------------
Part 16  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014451Z&X-Amz-Expires=3600&X-Amz-Signature=6eab4deb780ff48fe4e88dd45e8aa813b01529d153f982c342d2fc9f26a10258&X-Amz-SignedHeaders=host&partNumber=16&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 16  MD5: "82d942ac5f524454df62a3e668a3967b"
Part 16 ETag: "82d942ac5f524454df62a3e668a3967b"
-------------
Part 17  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014510Z&X-Amz-Expires=3600&X-Amz-Signature=df94173dd24135abb431e93364f4659a5acedbf2a93c4b2d32ee387bdc01e969&X-Amz-SignedHeaders=host&partNumber=17&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 17  MD5: "2aa82a9b688e84c77fcb7a7f37c4cb1a"
Part 17 ETag: "2aa82a9b688e84c77fcb7a7f37c4cb1a"
-------------
Part 18  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014526Z&X-Amz-Expires=3600&X-Amz-Signature=de0da4f6c3cbaba814c3f7fb3bc989cc8f648c8ef29921afb63f9482416dd7cf&X-Amz-SignedHeaders=host&partNumber=18&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 18  MD5: "abc9d1c77b3272ae799ffb062a687bc9"
Part 18 ETag: "abc9d1c77b3272ae799ffb062a687bc9"
-------------
Part 19  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014544Z&X-Amz-Expires=3600&X-Amz-Signature=64c82f4736807c28a02cc624105f591c613462eb7c46933f9278d089cd40cbd2&X-Amz-SignedHeaders=host&partNumber=19&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 19  MD5: "2a80800bcbfe3f1aa3a3ffb27a9b55b9"
Part 19 ETag: "2a80800bcbfe3f1aa3a3ffb27a9b55b9"
-------------
Part 20  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014601Z&X-Amz-Expires=3600&X-Amz-Signature=714c10558f9b8ddb5cef6e7232e8bc4b62586c6f2c79f6f513df6c36ee0051df&X-Amz-SignedHeaders=host&partNumber=20&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 20  MD5: "0f82733ccf7a2da84597ec0a1ec85c4b"
Part 20 ETag: "0f82733ccf7a2da84597ec0a1ec85c4b"
-------------
Part 21  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014617Z&X-Amz-Expires=3600&X-Amz-Signature=4e770ce27039e1cc68349b8380f30bc0f8ae6d0a735aa0ff2d0ad68a8ddfa2d6&X-Amz-SignedHeaders=host&partNumber=21&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 21  MD5: "83e8df156f7eb993e64558d76246274a"
Part 21 ETag: "83e8df156f7eb993e64558d76246274a"
-------------
Part 22  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014633Z&X-Amz-Expires=3600&X-Amz-Signature=535ede03ef32a2c329e945bb6984dbab703fde6d1c98e2e3231f94afc57403e9&X-Amz-SignedHeaders=host&partNumber=22&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 22  MD5: "229a39146e6040f3a89c1abf553bda3a"
Part 22 ETag: "229a39146e6040f3a89c1abf553bda3a"
-------------
Part 23  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014650Z&X-Amz-Expires=3600&X-Amz-Signature=72ade831afa32609e47fd04ea3da6464a0c4e9b4c8a4882c2c7339fb42451ad8&X-Amz-SignedHeaders=host&partNumber=23&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 23  MD5: "05079456308a1ab79adc8dbeccfcdfd2"
Part 23 ETag: "05079456308a1ab79adc8dbeccfcdfd2"
-------------
Part 24  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014707Z&X-Amz-Expires=3600&X-Amz-Signature=47f08e9c6d5f2616b2db9149e224a7bc7ee88fa9ed6619c38db4cc2ca3bbead1&X-Amz-SignedHeaders=host&partNumber=24&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 24  MD5: "45a5bd29544717410c9f6976cfaf4f68"
Part 24 ETag: "45a5bd29544717410c9f6976cfaf4f68"
-------------
Part 25  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014723Z&X-Amz-Expires=3600&X-Amz-Signature=6a674ee1bf57ac82f8100df6ee9075db33b35248ee9adf45b77679b88a4300c8&X-Amz-SignedHeaders=host&partNumber=25&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 25  MD5: "37403702d80317faf5e4180e4de95386"
Part 25 ETag: "37403702d80317faf5e4180e4de95386"
-------------
Part 26  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014740Z&X-Amz-Expires=3600&X-Amz-Signature=2f7a39776383360a23ca13be138c3a03ee8576ab0c91e9618cd88bc3462786f0&X-Amz-SignedHeaders=host&partNumber=26&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 26  MD5: "e278194fada294ad29ae4d3d7be4ccfd"
Part 26 ETag: "e278194fada294ad29ae4d3d7be4ccfd"
-------------
Part 27  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014757Z&X-Amz-Expires=3600&X-Amz-Signature=4d104d3a441ceed017ac59c7bdf901bc95aedb9665154e4941d16faf221575c9&X-Amz-SignedHeaders=host&partNumber=27&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 27  MD5: "519acb77f49307a8eaa2a9662c84a910"
Part 27 ETag: "519acb77f49307a8eaa2a9662c84a910"
-------------
Part 28  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014815Z&X-Amz-Expires=3600&X-Amz-Signature=4301eb1b622a2155c7ae473de32132a030133d117e66912f31f9551473ca131e&X-Amz-SignedHeaders=host&partNumber=28&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 28  MD5: "25b1ca5a2792650f04f8165955249406"
Part 28 ETag: "25b1ca5a2792650f04f8165955249406"
-------------
Part 29  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014831Z&X-Amz-Expires=3600&X-Amz-Signature=cc83ee809fc790808da7339900801f3bde3d680bb0cd9fae6a458fcb4a04d673&X-Amz-SignedHeaders=host&partNumber=29&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 29  MD5: "84cdbdd3a477467414b9ce3b5246f405"
Part 29 ETag: "84cdbdd3a477467414b9ce3b5246f405"
-------------
Part 30  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014847Z&X-Amz-Expires=3600&X-Amz-Signature=260c7d12a4e42b9fd3f2ea86c4043a8f14037ff0668bcba0b7c3a4ac7566d811&X-Amz-SignedHeaders=host&partNumber=30&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10485760 bytes...
Part 30  MD5: "33b9432858767a946cd0f101812d772e"
Part 30 ETag: "33b9432858767a946cd0f101812d772e"
-------------
Part 31  URL: "https://test-bucket.s3.us-west-1.amazonaws.com/uploads/large-file.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=XKIZWLZLEPG4SYDHVNVE%2F20200402%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200402T014904Z&X-Amz-Expires=3600&X-Amz-Signature=b23ce6110578432393a5a1b2136587a81225c1d999cf2bd8692d3ed5ad93ba2a&X-Amz-SignedHeaders=host&partNumber=31&uploadId=DaixYpccvyVqdKHFaSTCn6g_IwtfS4VofbD1orpPPCCFmgA4RvA7qy0HDoIxZZl0wwGDOlFggccUoYCHgfgozNCG0fBM1_89ZTIYqZgbrdyeFEeLpHy17qw8b1wqXLIC"
Sending 10039102 bytes...
Part 31  MD5: "f3b6e610ee0ff0e7b35b0532ec059b72"
Part 31 ETag: "f3b6e610ee0ff0e7b35b0532ec059b72"
-------------
Part 31/31 [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% | bytes: 10039102
Part 26/31 [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% | bytes: 10485760
Part 29/31 [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% | bytes: 10485760
Part 28/31 [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% | bytes: 10485760
Part 22/31 [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100% | bytes: 10485760
-------------
     My ETag: "068b95e4fbc2ac3ab46bd2d0fb30e6c4-31"
     S3 ETag: "068b95e4fbc2ac3ab46bd2d0fb30e6c4-31"
```
