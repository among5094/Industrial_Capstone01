from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import ARRAY
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from datetime import datetime


app = Flask(__name__)   # Flask 생성
CORS(app)   # 프론트엔드 백엔드 통신 허용

# PostgreSQL 연결
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1590@localhost:5432/Capstone'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = 'image/uploads'  # 사진 저장 폴더
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)    # SQLAlchemy 초기화

# 사용자
class users(db.Model):
    __tablename__ = 'users' # 테이블 이름

    user_id = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.String, nullable = False)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    ent_year = db.Column(db.String, nullable = False)  
    sch_state = db.Column(db.String, nullable = False) 
    department = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime)

# 게시물 작성 
class Post(db.Model):
    __tablename__= 'posts'

    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    author = db.Column(db.String, nullable = True)
    title = db.Column(db.String, nullable = False)
    contents = db.Column(db.String, nullable = False)
    category = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, nullable = False)
    image = db.Column(db.String, nullable = False)
    likes = db.Column(db.Integer, nullable = False)

    user = db.relationship("users", backref=db.backref("posts", lazy=True))


# 댓글
class Comment(db.Model):
    __tablename__= 'comments'

    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'), nullable = False)
    comment_id = db.Column(db.Integer, primary_key = True)
    contents = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, nullable = False)

    comment_user = db.relationship("users", backref=db.backref("comments", lazy=True))
    comment_post = db.relationship("Post", backref=db.backref("comments", lazy=True))

# 공지 대외 / 공모
class NoticePost(db.Model):
    __tablename__ = 'noticePost'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    npost_id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    content = db.Column(db.String, nullable = False)
    category = db.Column(db.String, nullable = False)
    dline_start = db.Column(db.Date, nullable = False)
    dline_end = db.Column(db.Date, nullable = False)
    activity_start = db.Column(db.Date, nullable = False)
    activity_end = db.Column(db.Date, nullable = False)
    location = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = False)
    views = db.Column(db.Integer, nullable = False)
    author = db.Column(db.String, nullable = False)
    orgType = db.Column(db.String, nullable = False)
    target = db.Column(db.String, nullable = False)
    homepage = db.Column(db.String, nullable = False)
    field = db.Column(db.String, nullable = False)
    benefit = db.Column(db.String, nullable = False)
    recruitCount = db.Column(db.String, nullable = True)
    awardScale = db.Column(db.String, nullable = True)

    npost_user = db.relationship("users", backref=db.backref("noticePost", lazy=True))


def __repr__(self):
    return f'<User {self.username}>'


''' 
테이블 생성
with app.app_context():
    db.create_all()
'''

# 회원가입 및 데이터 저장 라우트
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        new_user = users(
            id=data['id'],
            username=data['username'],
            password=data['password'],
            email=data['email'],
            ent_year=data['ent_year'],
            sch_state=data['sch_state'],
            department=data['department'],
            created_at=func.now()
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': '회원가입 성공'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 로그인 라우트
@app.route('/login', methods=['POST'])
def login():
    login_data = request.json

    print("요청 받은 data :", login_data)
    user_id = login_data['id']
    user_pw = login_data['password']

    print("요청 받은 ID:", user_id)
    print("요청 받은 PASSWORD:", user_pw)

    try:
        user = users.query.filter(users.id == user_id, users.password == user_pw).first()
        print("db search:", user)

        if user:
            return jsonify({
                'success': True,
                'user': {
                    'user_id':user.user_id, # 유저 고유 id
                    'id':user.id,
                    'password':user.password,
                    'username': user.username,
                    'email': user.email,
                    'ent_year': user.ent_year,
                    'sch_state': user.sch_state,
                    'department': user.department
                }
            }), 200
        else:
            return jsonify({'success': False, 'message': '아이디 또는 비밀번호가 일치하지 않아요.'})

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# 게시글 작성 라우트
@app.route('/posts', methods=['POST'])
def posting():

    image_path = None
    if 'image' in request.files: # 이미지 파일이 FormData에 포함되어 있는지 확인
        file = request.files['image']
        if file.filename != '':
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            image_path = filename # DB에는 파일 이름만 저장

    post_data = request.form

    print("받은 데이터: ", post_data)
    
    try:
        new_post = Post(
            user_id=post_data.get('user_id'),
            author=post_data.get('author'),
            title=post_data['title'],
            contents=post_data['content'],
            category=post_data['category'],
            created_at=func.now(),  # 자동으로 추가
            image=image_path,
            likes=post_data.get('likes', 0),

        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'message': '게시글 작성 성공'}), 201

    except Exception as e:
        print("작성 에러: ", e)
        return jsonify({'Error': str(e)}), 500
    
    '''
            file = request.files.get('image'),
            if file:
                filename = secure_filename(fime.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                image_url = f"/{C:/capstone/images}"
            else:
                image_url = ''
            '''

# 게시글 리스트
@app.route('/api/posts', methods=['GET'])
def get_posts():
    board_type = request.args.get('boardType')

    try:
        if board_type:
            posts = Post.query.filter_by(category=board_type).all()
        else:
            posts = Post.query.all()

        result = [
            {
                'id' : notice_post.post_id,
                'userId' : notice_post.user_id,
                'author': notice_post.author,
                'title': notice_post.title,
                'content': notice_post.contents,
                'category': notice_post.category,
                'createdAt': notice_post.created_at.timestamp() * 1000,  # JS에서 쓸 수 있게 밀리초로 변환
                'image': notice_post.image,
                'likes': notice_post.likes
            }
            for notice_post in posts
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 게시글 드가기기
@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):

    notice_post = Post.query.get(post_id)
    if not notice_post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify({
        'id': notice_post.post_id,
        'userId': notice_post.user_id,
        'author': notice_post.author,
        'title': notice_post.title,
        'content': notice_post.contents,
        'category': notice_post.category,
        'createdAt': notice_post.created_at.timestamp() * 1000,
        'image': notice_post.image,
        'likes': notice_post.likes
    }), 200

# 댓글 작성 라우트
@app.route('/comments', methods=['POST'])
def comments():

    c_data = request.json
    
    print("받은 데이터: ", c_data)
    
    try:
        new_comment = Comment(
            user_id=c_data['user_id'],
            post_id=c_data['post_id'],
            contents=c_data['content'],
            created_at=func.now(),  # 자동으로 추가
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': '댓글 작성 성공'}), 201

    except Exception as e:
        print("작성 에러: ", e)
        return jsonify({'Error': str(e)}), 500
    
# 공지 작성 라우트
@app.route('/noticePosts', methods=['POST'])
def noticePosting():

    image_path = None
    if 'image' in request.files:
        file = request.files['image']
        if file.filename != '':
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            image_path = filename # 데이터베이스에는 파일 이름만 저장
    #noticePost_data = request.json
    #print("받은 데이터: ", noticePost_data)
    data = request.form 

    print("받은 데이터 (FormData): ", data)
    print("받은 이미지 파일: ", request.files.get('image'))

    try:
        new_noticePost = NoticePost(
            user_id=data.get('user_id'),
            title=data.get('title'),
            content=data.get('content'),
            category=data.get('category'),
            # 날짜 필드들을 파싱, 값이 없으면 None으로 설정
            dline_start=datetime.strptime(data.get('dline_start'), '%Y-%m-%d') if data.get('dline_start') else None,
            dline_end=datetime.strptime(data.get('dline_end'), '%Y-%m-%d') if data.get('dline_end') else None,
            activity_start=datetime.strptime(data.get('activity_start'), '%Y-%m-%d') if data.get('activity_start') else None,
            activity_end=datetime.strptime(data.get('activity_end'), '%Y-%m-%d') if data.get('activity_end') else None,
            location=data.get('location'),
            image=image_path, # 저장된 이미지 파일 이름
            views=0, # 새 게시물은 조회수 0으로 시작
            author=data.get('author', '익명'), # 기본값 '익명'
            orgType=data.get('orgType'),
            target=data.get('target'),
            homepage=data.get('homepage'),
            field=data.get('field'),
            benefit=data.get('benefit'),
            awardScale=data.get('awardScale'), # 공모전일 경우에만 해당
            recruitCount=data.get('recruitCount'),
            # recruitCount는 category가 '대외활동'일 때만 처리
            # if data.get('category') == '대외활동':
            #    recruitCount=data.get('recruitCount'),
        )
        db.session.add(new_noticePost)
        db.session.commit()
        return jsonify({'message': '게시글 작성 성공'}), 201

    except Exception as e:
        print("작성 에러: ", e)
        return jsonify({'Error': str(e)}), 500
    
# 이미지 파일을 제공하는 라우트
@app.route('/image/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# 공지 게시글 리스트
@app.route('/api/noticePosts', methods=['GET'])
def get_notice_posts():
    try:
        notices = NoticePost.query.all()

        result = [
            {
                'id': notice.npost_id,
                'userId': notice.user_id,
                'title': notice.title,
                'content': notice.content,
                'category': notice.category,
                'dlineStart': notice.dline_start.isoformat(),
                'dlineEnd': notice.dline_end.isoformat(),
                'activityStart': notice.activity_start.isoformat(),
                'activityEnd': notice.activity_end.isoformat(),
                'location': notice.location,
                'image': notice.image,
                'views': notice.views,
                'author': notice.author,
                'orgType': notice.orgType,
                'target': notice.target,
                'homepage': notice.homepage,
                'field': notice.field,
                'benefit': notice.benefit,
                'awardScale': notice.awardScale
            }
            for notice in notices
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# 공지 게시글 드가기기
@app.route('/api/noticePosts/<int:npost_id>', methods=['GET'])
def get_noticePost(npost_id):

    notice_post = NoticePost.query.get(npost_id)
    if not notice_post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify({
        'id': notice_post.npost_id,
        'userId': notice_post.user_id,
        'author': notice_post.author,
        'title': notice_post.title,
        'content': notice_post.content,
        'category': notice_post.category,
        'image': notice_post.image,
        'location': notice_post.location,
        'views': notice_post.views,
        'orgType': notice_post.orgType,
        'target': notice_post.target,
        'homepage': notice_post.homepage,
        'field': notice_post.field,
        'benefit': notice_post.benefit,
        'awardScale': notice_post.awardScale,
        'dline_start': notice_post.dline_start,
        'dline_end': notice_post.dline_end,
        'activity_start': notice_post.activity_start,
        'activity_end': notice_post.activity_end,
        
    }), 200

# 공지사항 조회수 증가
@app.route('/api/noticePosts/<int:npost_id>/views', methods=['PATCH'])
def increase_notice_views(npost_id):
    try:
        notice_post = NoticePost.query.get(npost_id)
        if not notice_post:
            return jsonify({'error': 'Post not found'}), 404
        
        # 조회수 1 증가
        notice_post.views += 1
        db.session.commit()
        
        return jsonify({
            'message': '조회수 증가 성공',
            'views': notice_post.views
        }), 200
        
    except Exception as e:
        print("조회수 증가 에러: ", e)
        return jsonify({'error': str(e)}), 500
        
if __name__=='__main__':
    app.run(debug=True)
