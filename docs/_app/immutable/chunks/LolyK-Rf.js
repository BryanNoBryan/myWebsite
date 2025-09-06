import"./DsnmJJEf.js";import"./BUwabaiJ.js";import{f as b,a1 as y,s as e,t as v,a as I,c as o,b as t,a2 as T}from"./TpHHFT-8.js";import{h as a}from"./BYpuDceu.js";import{s as C}from"./0gT6S2XD.js";import{b as d}from"./ByG7FEK3.js";import{V as x}from"./DnEG_5xK.js";var k=b(`<!> <p>The base joint is called the <code>shoulder</code>, and the middle joint is called the <code>elbow</code>. The last joint at the very tip is called the <code>end effector</code>.</p> <p>The length between the shoulder and elbow is called the <code>upper arm</code>, and the length between the elbow and end effector is called the <code>forearm</code>.</p> <p>This arm uses two motors for the shoulder and one motor connected to a chain to control the elbow.</p> <p>These FTC goBilda motors only allow relative encoding, so we had to use limit switches to know our absolute position.
There is a limit switch at the very back under the upper arm, and another limit switch in between the two lengths. These
two limit switches enable use to set our initial rotation for each joints, so we know our position in space.</p> <p><img alt="among us"/></p> <p>How the arm is controlled is through a joystick, which steadily increases an (x, y) coordinate as our
input into our robot.</p> <p>Here is mockup for how data is passed:</p> <p><code>joystick</code> -> <code>(x, y)</code> -> <code>(q1, q2)</code> -> <code>(a1, a2)</code> -> <code>Motion Profile</code> -> <code>PIDF Controller</code></p> <p>* <code>(x, y)</code>: (x, y) coordinate positions in space relative to the robot, with x horizontal and y vertical.<br/> * <code>(q1, q2)</code>: The angles the shoulder and elbow should be at according to the above picture. Angles used should be angle wrapped to [-180, 180].<br/> * <code>(a1, a2)</code>: Final motor position. Because of our absolute positioning system with limit switches, the fact that we use
a chain for the elbow joint, and, most importantly, rotating the shoulder rotates the elbow in our specific robot build,
the <code>(q1, q2)</code> angles don’t exactly match the final position each motor has to travel to. After adding offsets from
our initial position and adding the shoulder travel “distance” to the elbow’s, we arrive at (q1, q2).<br/> * <code>Motion Profile</code>: Motion profiles define a trajectory for our reference over a certain time period.
For every time in this period, the motion profile tells what reference we should be at. We used a trapezoidal motion controller.<br/> * <code>PIDF Controller</code>: Proportion, Integral, Derivative, Feed-forward Controller. It enables the stable movement
from a setpoint to an endpoint. In this case, the feed-forward is adjusting for the effects of gravity. The calculation
for this feed-forward will be described below.</p> <p>In essence, the joystick controls the end effector’s position in space relative to the robot, enabling
motion that can preset or changed in real-time.</p> <h2>Robot Overview</h2> <p>The entire arm anatomy is only connected by two shafts of the three motors. The two motors on one side are driven
in parallel with a short chain and sprocket, because of the torque requirements to actually move the whole arm from the shoulder.
The side with one motor drives the long chain and sprocket spanning the whole upper arm, moving the elbow.</p> <p>We discovered that when we turn the shoulder, while attempting to keep the elbow motor fixed in position, nothing moved.
This is because as the shoulder turns, the entire chain and sprocket assembly rotates with the elbow motor as the axis of rotation.
Thus, we need to add to the elbow rotation angle with that of the shoulder’s.</p> <p>About the absolute positioning system, the initial angles are determined when the limit switches are pressed(startup and recalibrations),
adding a constant value(guess and checked) to the motor’s current position at that time.</p> <h2>(a1, a2)</h2> <pre class="language-undefined"><!></pre> <p>This is the general idea of what the final position calculations should look like.
You will have to deal with negative signs and constants by yourself <strong>(i.e. pain and suffering)</strong>.</p> <h2>Trapezoidal Motion Profile</h2> <p>Here’s an excellent source I used to learn and will reference from.<br/> <a href="https://www.ctrlaltftc.com/advanced/motion-profiling" rel="nofollow">CtrlAltFtc Motion Profiling</a></p> <p>The primary purpose of a motion profile is for smooth, controlled motion.</p> <blockquote><p>Motion profiles define a trajectory for our reference over a certain time period.</p></blockquote> <p>In human words, you define a distance. The motion profile tells you
where to be between 0 to distance at a point in time for smooth motion.</p> <p>The motion signature looks something like this:</p> <pre class="language-undefined"><!></pre> <p>The method makes use of simple kinematics to calculate where to be between [0, distance] at t=elapsed_time.</p> <p>At this point, you know where you want to be, but how do you get there with only motor.power()? That’s where
PIDF Controllers come in.</p> <h2>PIDF Controller</h2> <p>A PIDF Controller is a way to get you from a inital point to a final point (and stay there) with only
motor.power() and current position data.</p> <p>A PIDF Controller is actually an extension of a PID Controller, with F called feed-forward, basically meaning
handle external disturbances.</p> <p>P = Proportional
I = Integral
D = Derivative
F = Feed-Forward</p> <p>It would take too much time to explain it here, this will explain it better: <a href="https://www.ctrlaltftc.com/the-pid-controller" rel="nofollow">CtrlAltFtc PID</a></p> <p>I have two PIDF Controllers, one for the shoulder, and one for the elbow.</p> <p>The only external disturbances in my system are gravity and friction. I choose to ignore friction :)</p> <p>To account for gravity, I have to calculate the torque the arm exerts on the joints. Given <code>τ = r × F × sinθ</code>, I will
need to find a way to determine both r and F in both arm lengths.</p> <p>The easiest way to determine both are to treat each arm length as a point mass. Specifically, I make the
assumption that the center of each arm length are their center of masses.</p> <p>This makes things much simpler. However, now we also need to know the angle of the ‘points’ relative
to their joints now.</p> <p>It’s a bunch of tedious math using the current position of both joints. I leave it as an exercise to the reader :) <strong>(i.e. pain and suffering)</strong>.</p> <h3>Forearm calculation for the elbow</h3> <pre class="language-undefined"><!></pre> <h3>Shoulder calculation for the shoulder</h3> <p>Things get slightly more complicated as we have to take into account the masses
of both the upper arm and forearm.</p> <p>Thankfully, I made a drastic simplification like any physicist.</p> <p>I’ll simply average positions and masses of each arm length, with constants account for different masses of each arm length of course.</p> <p>weight1 = upper arm mass constant<br/> weight2 = forearm mass constant</p> <pre class="language-undefined"><!></pre> <h2>Closing Notes</h2> <p>Thanks for reading all the way to this point :)</p> <p>What I’ve said so far has all been an oversimplification. You get the gist, but
there are many tiny details along the way you’ll have to take care of yourself, like
motor ticks-per-rotation, Finite State Machines(for program asychrony), constants, PID tuning, angle wrapping, and the
tedious math for angle calculations.</p> <p>Do angle wrapping [-180, 180] I beg of you.<br/> <a href="https://www.ctrlaltftc.com/practical-examples/controlling-heading" rel="nofollow">CtrlAltFtc Angle Wrapping</a>.</p> <p>Here’s the source code if you want it:<br/> <a href="https://github.com/BxSciFTC/Centerstage/blob/MOTIONPROFILEDARM/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/opMode/testing/ArmPresetsTesting/ArmPresetsMotion.java" rel="nofollow">Motion Profile BxSciFTC Centerstage</a><br/> <a href="https://github.com/BxSciFTC/Centerstage/blob/MOTIONPROFILEDARM/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/opMode/testing/armTesting/NewArm2.java" rel="nofollow">Arm PIDF BxSciFTC Centerstage</a><br/> Make sure to be on the MOTIONPROFILEDARM branch. It isn’t as polished as it should be, but whatever :).</p> <p>Among Us Jumpscare 🗣</p>`,1);function j(p){var l=k(),h=y(l);x(h,{get src(){return`${d??""}/images/ftc1.mp4`}});var r=e(h,10),m=o(r);t(r);var i=e(r,22),u=o(i);a(u,()=>`<code class="language-undefined">a1 = shoulderInitialPosition - q1;
a2 = -elbowInitialPosition + q2 - shoulderCurrentPosition;</code>`),t(i);var n=e(i,16),f=o(n);a(f,()=>'<code class="language-undefined">Number MotionProfile(max_acceleration, max_velocity, distance, elapsed_time)</code>'),t(n);var s=e(n,30),g=o(s);a(g,()=>`<code class="language-undefined">τ = r × F × sinθ
τ = forearm_length/2 × mass × 9.81 × sin(relative_angle)
setpoint = MotionProfile(...)
elbow.power( PID(current_pos, setpoint) + τ );</code>`),t(s);var c=e(s,12),w=o(c);a(w,()=>`<code class="language-undefined">//shoulder COM
x1 = shoulderLen * cos(shoulderAngle) / 2;
y1 = shoulderLen * sin(shoulderAngle) / 2;
//elbow COM
x2 = (2 * x1) + (elbowLen * cos(downAngle) / 2);
y2 = (2 * y1) + (elbowLen * sin(downAngle) / 2);
//weighted averaging
COMx = (weight1 * x1 + weight2 * x2) / 2;
COMy = (weight2 * y1 + weight2 * y2) / 2;
COMAngle = atan2(COMy,COMx);
r = sqrt(COMx ^ 2 + COMy ^ 2);

τ = r × F × sinθ
τ = r × (weight1 + weight2) × 9.81 × sin(COMAngle)
setpoint = MotionProfile(...)
shoulder.power( PID(current_pos, setpoint) + τ );</code>`),t(c),T(12),v(()=>C(m,"src",`${d??""}/images/ftc2.png`)),I(p,l)}export{j as default};
