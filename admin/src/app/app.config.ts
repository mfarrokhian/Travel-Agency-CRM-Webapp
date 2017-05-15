import { Headers } from '@angular/http';
const JsonApiHeaderBasic = {'Accept': 'application/vnd.api+json'};
const POST_HEADER = new Headers({'Content-Type': 'application/json'});
const JSON_API_HEADER_BASIC = new Headers(JsonApiHeaderBasic);
const JSON_API_HEADER_EXTENDED = new Headers(Object.assign(JsonApiHeaderBasic, {'Content-Type': 'application/vnd.api+json'}));
const VALIDATE = '/api/validate/';
const REGISTER_API = '/api/register/';
const GET_ADMIN_INFO = '/api/get-admin-info/';
const SIGN_OUT = '/api/sign-out/';
const GET_FILES = '/api/files';
const DOWNLOAD_FILE = '/api/download';
const OFFERS = '/offers';
const SOUNDS = {
    // tslint:disable-next-line:max-line-length
    notification: 'data:audio/mp3;base64,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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSxLYDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==',
    cancel: 'data:audio/mp3;base64,SUQzAwAAAAAAH1RYWFgAAAAVAAAAU29mdHdhcmUATGF2ZjUyLjU0LjD/+5AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAsAABOWABcXFxcXFxcXFy4uLi4uLi4uLkVFRUVFRUVFRV1dXV1dXV1dXXR0dHR0dHR0dIuLi4uLi4uLi6KioqKioqKiorq6urq6urq6utHR0dHR0dHR0ejo6Ojo6Ojo6P///////////wAAADlMQU1FMy45OHIBqgAAAAAAAAAAFIAkBbJGAACAAAATlmW8qs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5AEAASCKWq9AAJPQkotl8kEBbYKAa8O9BKACTy14WqAUAH/76SEJV/I2jHDnQiEY7ZCKc/znOLc9sk5+p6nQ/kapG/+QhGSf/ggFBJiB05o0baTCiAUMZ/6J1hQ6ewhAjBMXCjLYAwAAAUASB////+BfQQFGyK8jHOdCZJznchHIShG4mdyNkOdCEJQnI3n/5CE//o/nPUjHcgoJi6SEzi5zqA4HMQgCAAHAOMDiuSoucKb2woD/v///0b9d2YjI1J21O/ep92cys7Hvch3KVTnRXcpzEruqW01YjUY7MjO6oXPKZ2sR2vt////drpq+tLq6MtUUkSZXoR4iDGFTCZmADgtiJA/5zujEJ/8hP7Zz9s51Z8i1QpJ0rorURmxIvWdLzc3oKOJHeZWNeJul6PJon++v/+nbdsmodFqROKMHIgxBASUxlGhwegqEhwwdIoGQKCC0Diy1gQMhIBAD/3kZept5pRr89ysWDINERMHcB3D8/MPgMAwYwb8qIAYDCAARF/A26iwM0EYDBqh9lXACFYDQvDAIGEQC9aetN7/+5IEJwAD40zL7nqgBHxpiX3PVACL+QFtubmAEYAgLbc3MAIOE4N9Aw2BwMUgccH/4AQPIUXYcuJmOb/6ubn2Nzf/+v9Jpugzqb///z6CZvNygdgcEEwnFlrEgaAQCAH/H4eNQFck30aD/ysWDODHdMNkEPD8/MPgL4wYwb9BgQjICyR9oGkS6Bvg/AY1VfoKuAcGwLB8MQgBB/TTutN4OD4NyQMMgUDE4FHZ/1vAGBZLi7DlxMxzf/6yfJM1J83Wn//+++mr///59kzeOnMBgMBgMhgMhsMhgMgADCbM/OhmYF21Q3DUOBPhohkqgdIRRgcR//fCxYLKfAUeJ0IqXF+TRAh8jo/x9Cbws4AzsWzOG3VkTKxVPl5Gv/0jIxSK/1//tdmc0///IIdBrqwGAwGAxGAyGwzGAyAAMJsT8aGZgXbVDbtI4E+GiGSqB0hFIBxP/98BoQNifAC+G+F1DfMiBEaQz/H0KTC/gDdxbM4bdWRMrFU+XjGv/0i8UTYiaHr//3ZnQ///IIdBrqoAAgQBBhgGku6zwwHA4wLA4wlB//uSBAmIgrlCTdd2IABdiDmH70wACyC5IM9uB4FeluQF7cDyAzy5w3pLQx3HQxCDcwmC0gAd0oeh6/jSv1lEZUKEOmICTJqj///UXiLB7QKkcJdNW////8xJkXCTqLf////+iLNIiasAgAEQMBSldKbhgMgSGA6BEYIYExi4KuGW6IsYXoXBg4AumCQCeOAMsCcp3r+NKlSSWOSGNQXqFiwypAS6a///zImhlgsuAuUnUUW////6zEgInUnUW/////9ZMmqIQAgBqoiAAAICJgJAWGBqDWYRwpRnN8eGXwPcdPMmqq5x0IaKiAo7S4beKS+kwzwzwrt0MnNmlSx0KPn//60Ey4J3BuEgyLt////9RDjz///s//////dKUUAg1URAAAEBEwEgLDA1BpMI4UozleKjL0HsOnmTVVU46ENFRAUdpcNvFJfSYZ4Z1JtZBnagyKWOhR8///WyZcFLhYSQZFJv////qHKPGv//q//////pyGQqBwAwsBCRAlFARoYIsYpANZtxnKHsIEca8kGYvlqYRQgZEl0FAhHQAYS9Uv/7kgQVjdLkHEWD3ZngYeOYoXuzOgnobxgs+mNRSY3jCZ9MaFpLHeaxrMJMChXSBoGzzuX//+pMEAQGREkG//+v///t///++skskRMqioqIQ4UBMPjRABQBwkBaRAtFAUoQKEYvAPpvooJH6oFMbXkuY4miYVS0ZPmwDApHQEWy9UflFi/jq7HknTBwkQLRH4RckTZv//6kwQDAVUNo1PP//2939KfX+Lf//vojceiXaXPBd5MEgmQtUDBwSoYWZgMg7GCsMaY2e+ZveDqmDKCwYCwCZhBiCAEDADAml+mmwNO31q6JNAIgKmUyCpf//b0ycFzHf////1//////2k3uShIGIGiYSFqgYOCVDCxMBcHYwVBizGx3hN7IdMwYwVjAWATMIMQQAgYAYE0v002Bp2+tLokCAE4HbJscKX///ZMnBcx3/////b////6Kb0jx1IDK6EKHEwAhwADGhCAGYAACxgKgamBwDwYTIuJnpfSmXKRGdlUGvLhz8OaYkgZERHbSLyynTQ7mgOhkC4QJfq//t4zwjVHXtt//3////9X/+5IEJImTGWjFM9uBsl4DeLp7cTYMLbEQL3BHQYM14gXuCOv//9X11///////1a1Myl+tlNWtN2QonYjC0gAABOVgAANGL7gQA4wDwKzAsBkMIMT8zVNpzKDHZOYkDTk44lzM+PQcaJ9upF5ZTpt0zQH4QYQAcpdduug92VSSXUkgKGDCpnyn//v///7v//+WfkxEGyYSDyw2JQwRDUeAKKAJCIFsoC9MOsDI1DjVTnTB7OHFwyAfjDN7MvIMVCCqL1SWYr587/6myzoM4dv/+3ruX//+v/6f0fTX7bL9qf6se/r+7+///au/Ty6aSMVjUncxR3UWgzK5zqYWYiGo8AUUASEQLZQFyYdIGRqEGonOODycMLhkA+GGbyZeQYyEFUXqksxXz5/71NmAgSFOHb//0tTOA///X//+v7/n217baPVbMk337X////9fatnbJa/ReDKhR0VA7O8GoypIVAUFgBwSA4YBgJ5geiMGKtQUa44pRpBqYOFGrX4IHwgmVhfqW2ufv//9LyFK3///9//////7fp/9K/+79X6dv/////uSBCGJsrdsxIPbEdBSjSihe202ye2fFM9o5olPNiJV4Aqp/3+z1/5noprMxSMckxWBrUkEUExAKYpVCAAMGgKGAMCCYGIeBiTRhGoSI4Z0VmBgho1GDBcMGl6v1LbXFfOAUxstv//9Vt///////////7f//2//b///9q1u+y79qa2ep0bMgZAqoiwglkCE8EAGGAaBeYHQVhjmvmGJkIEceKZ8+cBcZcoLB20nyBMwz6gTa//pT96/////////9P0/p+3/X/////+3zbWXVmO6o6mJHnIZD5wwSvAQgAgABAwEQOTBGDGMg2NoxXhKjBVBTMCcCcwTgODAdAaEgD2aRect4a///9vHRay/lPK//r1t/df609v////+ZJre71cFCVUrsRzsTVShEUocQwQ8YOAICwMwBhWgaKTYAcMAXAYZwNgYDQTgACSAwMgoERH0WTi0P57/6v9P6pb10Xf5f////+TsqndFfo7s5HClXZOiARQAfpzVxkQAhEBmBgrTIlGuNCoC42UbMNJwBJGMlC2YMoRio34Y///////////7kgQ6D/JIZcSCwBTiSy2IkHtlNEjhrxIPAFOJKrViQeAKaf/+lq7//7+m21e9P+/////8/+vekxiVZCmFm2qrKBy5u04K0i+oNAWMBIHswqU1zLgCRMBcApHkwGwUhGAEly/UttY9////+t9Pl/2r/6677p/T///++/zTb6Ha6ENtuQxQ4YO4s4e7TgrSL6g0BYwEAezCpTRMtwJEwFwCkeTAbBSEYASXMDUtrn/////Tf6//t//16s9+vr+f////20+2zsqt0WxnKhyKCoDVjHHFiJIgKCA2kI3gwA4wEwVzDwRpMIUIc8aMhDyssyvyR3nZ/6///9tO3////3v/////+31/fye/////6Ztt+7KnQxzkOgoBZUMDYBUAmoDaQjeDADjATBXMO5GMwhQhzxoyCPKyzK/JHYch/6//vP///////////3692+q+/bpb////3/6XfWZXtdWUjUkZBTs0soNV1S2TvYxciAAeEo0sRE5LBM1gIECAvHMALfC7pU0t0X//df/6//1///b7a+s2tP7zJlT9Lr/+3//+jt3/+5IEZg3SPmnEi9gRpkmNiJF7AjRJdZkQLuhGiSQ14gXQCetb6jTNU6vMgk5oNSimyaIwuClsiexi5EAA8JRpYh5ySCZhYAQIAgQiKYAAW+F3W9eattK////77a9vsrfonZ7U/1+v////+vLWTq6pQsjIHveyginCEUUhRU+Mw06K8hEApgGIRjVgRuyKAKA1gRgMFqerNpbax7/f/////TTvf97Xq1rt1ovO7qq7/0v219/9P/9uZ6yTFqU46qxJjuaUdRwVwSw4UplT6siFABAIbGLVPGzIhA4BXCMAgjXi207lzv/2//////rvt9+tq+5kmR9U/ROz/a3////s3el2pzu0pTHVXUhmOgQw4CzuGKTcxE2kJHgQJDHedjCwQDCNIsIAsaB7HWdG//r/+7fun/+v6fff/vvfftsvqt7a0Qn/6f//+ye/9TN+7O7I5WYiMdmi2RSuHYECi0ouzETaQkeBAkMd5yMLBAMI0iwgCxoHvZt///t/+pubf3erf///2/9vfPZdV2RfrX9KdPb//9P+6bV0ZtUIrMwpQqwh//uSBJIN0mNpw4OgE8JJDZiAdAJ4CVWrEC7gRpkrtiIJ3AjRCuFLdhwTzLVFI4Q0MrAhodGAcSB10vxSiYwjvd2VKKZmPf9/3fb/////9unqvbrTvzEROy7/ou+Xstunt///TVr2Jc89pnaQRMOI2XcJUAwsOD5RpKABaopHCGhlAFNDooDiAOml+KUTGC/cik1NZ/9yKivNvp/+3/X//9/9/XvTt21RF/0tT/p///z+2z/RZnZTGawc5ihmQESimQsoZgAf7stkQAlsWisDPy04xdAdQSJTZKFJAK5UMzAIHjA6kkUiJE40oDECwQmTQWpJFJGiRpxZR5iZBBakkUkTjTSizAwMHqgwMSphgaqiUJK01es///lTRxtkAQ7A0Cus01axmXnUOsM4TZKFJAK5UMzAICxgdSSKREicaUBiAcgTJoJqSRSROJGnFlHmE0EFqXISEkogYGLqgwMSphgaqiUJpp5VIAKod5YDXQJeh6Q4gfIS0TwhZeEusC5kmIjqjcLSTOKTzc3JKqgnSyyuhlkyhg1OLFWPrCos36hYV//7kgS7gIJrbEQDmCmSS62YgnMCMgqchydMMMbJOQ7kaZYZEfWKi38WZ1sxXxT/F/8U/qF3ADiJmWA10CXoekOIHyEtE8IWXhLrAuZJiI6o3DlFgRl5ublGmlHw7FlF3G58qTjiwTFRUEDVYVFm/ULCv6xUW/izOLsxXxRv8X/rFP6hdMQU1FMy45OC4yVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OC4yVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5IE3A/yVBw8iekbQE8Dh5E9JmIAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
};
export { REGISTER_API,
    POST_HEADER,
    GET_ADMIN_INFO,
    SIGN_OUT,
    VALIDATE,
    SOUNDS,
    GET_FILES,
    JSON_API_HEADER_BASIC,
    JSON_API_HEADER_EXTENDED,
    DOWNLOAD_FILE,
    OFFERS };
