import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/demo/service/http.service';
import { GlobalService } from 'src/app/global.service';
import * as lodash from 'lodash';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {

    selectedOption: string = 'all'
    name: string = ''
    description: string = ''
    isOpenVideo: boolean = false
    layout: string = '1'
    n: number[] = [1, 2, 3, 4, 5, 6,7,8]
    activeIndex: number = 0
    visibleLayoutModal: boolean = false;
    userValue: any = {}
    nodePort: string = '';
    allRecords: any = []
    isSubmitted: boolean = false
    playListtTotalDuration: any = ''
    libraryTotalDuration: any = ''
    noRecord: boolean = false;
    backupDataList: any[] = [];
    backupAudioList: any[] = [];
    backupVideoList: any[] = [];
    loader : boolean = false
    audios: any = [
        {
            id: '1',
            image: '/assets/temp/audio.mp3',
            icon: '../../../../assets/images/audio.jpg'
        },
        {
            id: '2',
            image: '/assets/temp/audio.mp3',
            icon: '../../../../assets/images/audio.jpg'

        },
        {
            id: '3',
            image: '/assets/temp/audio.mp3',
            icon: '../../../../assets/images/audio.jpg'

        },
        {
            id: '4',
            image: '/assets/temp/audio.mp3',
            icon: '../../../../assets/images/audio.jpg'

        }

    ]
    availablePlaylist = [{
        id: 1,
        image: ' c'
    },
    {
        id: 2,
        image: ' /assets/images/temfourpicsix.png'
    }, {
        id: 3,
        image: ' /assets/images/temfourpicseven.png'
    }, {
        id: 4,
        image: '/assets/layout/images/temp.jpg'
    },
    ]

    videos = [
        {
            id: 1,
            image: '/assets/layout/images/temp.jpg',
            video: ' /assets/temp/ved.mp4'
        },
        {
            id: 2,
            image: '/assets/layout/images/temp.jpg',
            video: ' /assets/temp/ved.mp4'
        }, {
            id: 3,
            image: '/assets/layout/images/temp.jpg',
            video: ' /assets/temp/ved.mp4'
        }, {
            id: 4,
            image: '/assets/layout/images/temp.jpg',
            video: ' /assets/temp/ved.mp4'
        },
    ]
    selectedPlaylist = [];
    draggedPlaylist: any
    displayList: any = [{
        name: "1: Single display area",
        desc: "(Zone and haut: 1280x720)",
        img: ' /assets/images/1.png',
        value: '1'

    },
    {
        name: "2a: Two zones with zone at the top right",
        desc: "(Top area: 960x720, side area: 320x720)",
        img: ' /assets/images/2a.png',
        value: '2a'

    },
    {
        name: "2ap: Single area(portrait) oriented clockwise",
        desc: "(Top area: 720x1280)",
        img: ' /assets/images/2ap.png',
        value: '2ap'
    },
    {
        name: "2ap270:  Single zone(portrait) counter clockwise",
        desc: "(Top area: 720x1280)",
        img: ' /assets/images/2ap270.png',
        value: '2ap270'

    },
    {
        name: "2b: Two zones with the zone at the top left",
        desc: "(Top area: 960x720, side area: 320x720)",
        img: ' /assets/images/2b.png',
        value: '2b'

    },
    {
        name: "2bp:Single area(portrait) oriented clockwise ",
        desc: "(Top area: 720x520, bottom area: 720x740)",
        img: ' /assets/images/2bp.png',
        value: '2bp'

    },
    {
        name: "2bp270:  Two zone(portrait) counter clockwise",
        desc: "(Top area: 720x520, bottom area: 720x740)",
        img: ' /assets/images/2bp270.png',
        value: '2bp270'

    },
    {
        name: "2c: Two area of the equal side with the video side on the left",
        desc: "(Top area: 640x720, side area: 640x720)",
        img: ' /assets/images/2c.png',
        value: '2c'

    }, {
        name: "2d:Two area of the equal side with the video side on the right",
        desc: "(Top area: 640x720, side area: 640x720)",
        img: ' /assets/images/2d.png',
        value: '2d'

    },
    {
        name: "3a: Three zone(bottom) with zone at the top right",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/3a.png',
        value: '3a'

    },
    {
        name: "3b:Three zone(bottom) with zone at top left",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/3b.png',
        value: '3b'

    },
    {
        name: "3c:Three zone(top) with zone top right(enable in settings)",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/3c.png',
        value: '3c'

    },
    {
        name: "3d: Three zone(top) with zone top left(enable in settings)",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/3d.png',
        value: '3d'

    },
    {
        name: "4a: Three zones(side) with zone top right",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/4a.png',
        value: '4a'

    },

    {
        name: "4b:Three zones(side) with zone top left",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/4b.png',
        value: '4b'

    }
        ,
    {
        name: "4c:  Three zones(side) with zone top right (enable in settings)",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/4c.png',
        value: '4c'

    },
    {
        name: "4d: Three zones(side) with zone top right (enable in settings)",
        desc: "(Top area: 960x540, side area: 320x540, bottom area:1280x180)",
        img: ' /assets/images/4d.png',
        value: '4d'

    },
    ]
    isOpenAudio: boolean = false;
    viewVideo: any = [];
    viewAudio: any = [];
    totalDuration: number = 0;
    getPlayListWithName: string

    constructor(public global: GlobalService, private http: HttpService, private activeRoute: ActivatedRoute,) { }

    ngOnInit(): void {
        this.userValue = JSON.parse(localStorage.getItem('user_Auth'));
        this.getAllRecord()
        this.activeRoute.paramMap.subscribe((params) => {
            this.getPlayListWithName = (params.get('playList'))
            if (this.getPlayListWithName) {
                this.getPlaylists(this.getPlayListWithName)
            }
        })


    }
    search(event) {
        this.noRecord = false;
        if(this.selectedOption=='audios'){
            this.audios = this.backupAudioList.filter((audio) => {
                return (
                    audio.name
                        .toLowerCase()
                        .indexOf(event.target.value.toLowerCase()) > -1
                );
            });
            if (this.audios.length == 0) {
                this.noRecord = true;
            }
            if (event == '') {
                this.audios = this.backupAudioList;
            }
        }
        if(this.selectedOption=='videos'){
            this.videos = this.backupVideoList.filter((audio) => {
                return (
                    audio.name
                        .toLowerCase()
                        .indexOf(event.target.value.toLowerCase()) > -1
                );
            });
            if (this.videos.length == 0) {
                this.noRecord = true;
            }
            if (event == '') {
                this.videos = this.backupVideoList;
            }
        }
        else{
            this.availablePlaylist = this.backupDataList.filter((image) => {
                return (
                    image.name
                        .toLowerCase()
                        .indexOf(event.target.value.toLowerCase()) > -1
                );
            });
            if (this.availablePlaylist.length == 0) {
                this.noRecord = true;
            }
            if (event == '') {
                this.availablePlaylist = this.backupDataList;
            }
        }
    }
    deleteSelected() {

    }

    showVideo(playlist) {
        debugger
        this.viewVideo = { video: playlist.video }
        this.isOpenVideo = true
    }
    showAudio(playlist) {
        debugger
        this.viewAudio = { audio: playlist.audio }

        this.isOpenAudio = true

    }

    getFileExtension(playlist) {
        if (playlist.video) {
            return playlist.video.substring(playlist.video.indexOf('.'))
        }
        return playlist.image.substring(playlist.image.indexOf('.'))
    }
    setSelected(option: string) {
        this.selectedOption = option;
    }

    dragStart(product) {
        this.draggedPlaylist = product;
    }

    increaseCalculateCount(playlist) {
        // if (!playlist.count) {
        //   playlist.count = 1
        // } else {
        playlist.count++
        this.totalDuration++
        this.playListtTotalDuration = this.time_convert(this.totalDuration)

        // }

    }

    decreaseCalculateCount(playlist) {
        if (!playlist.count || playlist.count == 0) {
            playlist.count = 0
        } else {
            playlist.count--
            this.totalDuration--
            this.playListtTotalDuration = this.time_convert(this.totalDuration)
        }

    }
    pushToPlaylist(product){
        this.dragStart(product);
        this.drop()
    }
    drop() {
        if (this.draggedPlaylist) {
            if (this.n.length > 0) {
                this.n.pop()
            }
            this.draggedPlaylist.count = this.draggedPlaylist.duration == 0 ? 10 : parseInt(this.draggedPlaylist.duration)
            this.totalDuration += parseInt(this.draggedPlaylist.count)
            this.playListtTotalDuration = this.time_convert(this.totalDuration)

            let draggedPlaylistIndex = this.findIndex(this.draggedPlaylist);
            this.selectedPlaylist = [...this.selectedPlaylist, this.draggedPlaylist];
            // this.availablePlaylist = this.availablePlaylist.filter((val, i) => i != draggedPlaylistIndex);
            this.draggedPlaylist = null;
        }
        console.log(this.selectedPlaylist)

    }

    dragEnd() {
        this.draggedPlaylist = null;
    }

    findIndex(product) {
        let index = -1;
        for (let i = 0; i < this.availablePlaylist.length; i++) {
            if (product.id === this.availablePlaylist[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

    changeVisiblity() {
        this.visibleLayoutModal = !this.visibleLayoutModal
    }

    setLayout() {
        this.visibleLayoutModal = !this.visibleLayoutModal
    }

    createPlaylist() {
        this.loader = true
        this.isSubmitted = true
        if (!this.name || !this.description || this.selectedPlaylist.length == 0) {
            this.global.alertBox('Please fill out all information', 'Alert')
            return
        }
        let obj = {
            file: this.name.toString(),
            description: this.description,
            user_id: this.userValue.user_id
        }
        this.http.post("playlists", obj).then(response => {
            this.assignMediaToPlaylist(response['name'])
            this.loader = false
        }).catch(reason => {
            this.loader = false
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })
    }

    assignMediaToPlaylist(playlistName: string) {
        let assets = []
        this.selectedPlaylist.forEach(element => {
            let obj = {
                duration: element.count == undefined ? 0 : element.count,
                filename: element.name,
                isVideo: false,
                option: { main: false },
                selected: false
            }
            assets.push(obj)
        });
        let newObj = {
            assets: assets
        }
        this.http.post("playlists/" + playlistName, newObj).then(response => {
            this.assignAssetsToPlaylist(playlistName)
        }).catch(reason => {
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })



    }

    assignAssetsToPlaylist(playlistName: string) {
        let assets = []
        this.selectedPlaylist.forEach(element => {
            assets.push( element.name)
        });
        let newObj = {
            assets: assets,
            playlist: playlistName
        }
        this.http.post("playlistfiles",newObj).then(response => {
            this.global.showToast("success", "Success", "Playlist Created Successfully")
            this.selectLayout(playlistName)
            this.global.goToPage('main/playlists')
        }).catch(reason => {
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })



    }



    selectLayout(playlistName: string) {
        if (!playlistName)
            return
        let obj = {
            layout: this.layout,
            templateName: "custom_layout.html",
            // isVideo: false,
            videoWindow: { mainzoneOnly: false },
            zoneVideoWindow: {}
        }
        this.http.post("playlists/" + playlistName, obj).then(response => {
            this.visibleLayoutModal = !this.visibleLayoutModal
            this.global.showToast("success", "Success", "Layout Updated Successfully")
        }).catch(reason => {
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })

    }

    getAllRecord() {
        this.loader = true
        this.http.get("files/" + this.userValue.user_id).then(response => {
            this.nodePort = response['port']
            this.allRecords = response['dbdata']
            let duration = 0;
            this.allRecords.map((rec) => {
                if (rec.type == 'video') {
                    debugger
                    rec.video = this.nodePort + "/media/" + rec.name
                    rec.image = this.nodePort + "/media/_thumbnails/" + rec.name
                }
                else if (rec.type == 'audio') {
                    rec.audio = this.nodePort + "/media/" + rec.name
                    rec.image = '../../../../assets/images/audio.jpg'
                } else {
                    rec.image = this.nodePort + "/media/" + rec.name
                    rec.showThumbnail = this.nodePort + "/media/_thumbnails/" + rec.name
                }
                duration += parseInt(rec.duration)

            })
            this.libraryTotalDuration = this.time_convert(duration)
            this.videos = this.allRecords.filter(x => x.type == "video")
            this.backupVideoList = lodash.cloneDeep(this.videos);

            this.audios = this.allRecords.filter(x => x.type == "audio")
            this.backupAudioList = lodash.cloneDeep(this.audios);

            this.availablePlaylist = this.allRecords.filter(x => x.type == "image")
            this.backupDataList = lodash.cloneDeep(this.availablePlaylist);
            this.loader = false
        }).catch(reason => {
            this.loader = false
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })
    }

    time_convert(e) {
        const h = Math.floor(e / 3600).toString().padStart(2, '0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(e % 60).toString().padStart(2, '0');

        return h + ':' + m + ':' + s;
    }

    getPlaylists(playlistName) {
        this.http.get("playlists/" + playlistName).then((playlistData: any) => {
            this.totalDuration = 0;
            this.name = playlistData.name
            this.description = playlistData.description
            playlistData.assets.map((rec) => {
                rec.name = rec.filename
                rec.count = rec.duration
                rec.image = rec.image = this.nodePort + "/media/" + rec.name
                this.totalDuration += rec.duration
            })
            this.playListtTotalDuration = this.time_convert(this.totalDuration)

            this.selectedPlaylist = playlistData.assets
            this.layout = playlistData.layout
        }).catch(reason => {
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })
    }

    removeItemFromPlaylist(index) {
        this.selectedPlaylist.splice(index, 1)
        this.n.push(7)
    }
}
