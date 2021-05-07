import React from "react";
import { connect } from "react-redux";

import CustomerForm from "./CustomerForm";
import SearchedBranchesTable from "./SearchedBranchesTable";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 70px)",
  },
  form: {
    position: "relative",
    top: theme.spacing(12),
  },
}));

const CustomerSearch = ({ branchInfo }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      justify="space-around"
      alignItems="flex-start"
    >
      <Grid item xs={5} className={classes.form}>
        <CustomerForm />
        {renderFormSvg()}
      </Grid>

      <Grid item xs={5}>
        {branchInfo.length ? <SearchedBranchesTable /> : renderSvg()}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  branchInfo: state.branchInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);

const renderFormSvg = () => {
  return (
    <svg
      id="e2e16f07-c08d-4c73-859c-14fba73875a7"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width="765.83927"
      height="536.7767"
      viewBox="0 0 765.83927 536.7767"
    >
      <path
        d="M975.74765,531.16211H445.25318a7.18,7.18,0,0,1-7.172-7.172V195.42H982.91963V523.99013A7.18,7.18,0,0,1,975.74765,531.16211Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#e6e6e6"
      />
      <path
        d="M960.19238,510.62891H460.80859a7.258,7.258,0,0,1-7.25-7.25V232.78955a7.25835,7.25835,0,0,1,7.25-7.25H960.19238a7.258,7.258,0,0,1,7.25,7.25V503.37891A7.25772,7.25772,0,0,1,960.19238,510.62891Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#fff"
      />
      <path
        d="M982.68727,205.56618H437.849V188.78363a7.18,7.18,0,0,1,7.172-7.172H975.51529a7.18,7.18,0,0,1,7.172,7.172Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#6c63ff"
      />
      <circle cx="238.36468" cy="12.23725" r="4.28342" fill="#fff" />
      <circle cx="254.62349" cy="12.23725" r="4.28342" fill="#fff" />
      <circle cx="270.88229" cy="12.23725" r="4.28342" fill="#fff" />
      <rect
        x="287.80315"
        y="92.44901"
        width="51.46951"
        height="22.78159"
        fill="#e6e6e6"
      />
      <rect
        x="390.74217"
        y="139.69972"
        width="51.46951"
        height="22.78159"
        fill="#e6e6e6"
      />
      <rect
        x="287.80315"
        y="210.57577"
        width="51.46951"
        height="22.7816"
        fill="#6c63ff"
      />
      <rect
        x="390.74217"
        y="257.82646"
        width="51.46951"
        height="22.78159"
        fill="#6c63ff"
      />
      <rect
        x="647.24598"
        y="281.45181"
        width="51.46951"
        height="22.78159"
        fill="#6c63ff"
      />
      <rect
        x="595.77647"
        y="186.95042"
        width="51.46951"
        height="22.78159"
        fill="#e6e6e6"
      />
      <rect
        x="442.21169"
        y="186.95042"
        width="102.93903"
        height="22.78159"
        fill="#6c63ff"
      />
      <rect
        x="442.21169"
        y="67.9799"
        width="102.93903"
        height="22.78159"
        fill="#6c63ff"
      />
      <path
        d="M453.414,225.12244V511.15792H968.10918V225.12242Zm513.00764,23.6958H916.80858V226.81h49.61307ZM660.30477,414.6876V392.67974H761.21839V414.6876Zm100.91367,1.68753V438.3834H660.30472V416.37513Zm0-94.78239v22.00787H660.30472V321.59274Zm-100.91367-1.68752V297.89694H761.21839v22.00828Zm0,47.39119V345.28813H761.21839v22.00828Zm100.91367,1.68752v22.00828H660.30472V368.98393ZM658.61725,343.60061H609.00418V321.59274h49.61307Zm0,1.68752v22.00828H609.00418V345.28813Zm0,23.6958v22.00828H609.00418V368.98393Zm0,23.69581V414.6876H609.00418V392.67974Zm104.28872,0H812.519V414.6876H762.906Zm0-1.68753V368.98393H812.519v22.00828Zm0-23.6958V345.28813H812.519v22.00828Zm0-23.6958V321.59274H812.519v22.00787Zm0-23.69539V297.89694H812.519v22.00828Zm0-23.6958V274.20114H812.519v22.00828Zm-1.68753,0H660.30472V274.20114H761.21839Zm-102.60119,0H609.00418V274.20114h49.61307Zm0,1.68752v22.00828H609.00418V297.89694Zm-51.3006,22.00828H557.7027V297.89694h49.6139Zm0,1.68752v22.00787H557.7027V321.59274Zm0,23.69539v22.00828H557.7027V345.28813Zm0,23.6958v22.00828H557.7027V368.98393Zm0,23.69581V414.6876H557.7027V392.67974Zm0,23.69539V438.3834H557.7027V416.37513Zm1.68753,0h49.61307V438.3834H609.00418Zm49.61307,23.6958v22.00786H609.00418V440.07093Zm1.68752,0H761.21839v22.00786H660.30472Zm102.6012,0H812.519v22.00786H762.906Zm0-1.68753V416.37513H812.519V438.3834Zm51.30059-22.00827h49.6139V438.3834h-49.614Zm0-1.68753V392.67974h49.6139V414.6876Zm0-23.69539V368.98393h49.6139v22.00828Zm0-23.6958V345.28813h49.6139v22.00828Zm0-23.6958V321.59274h49.6139v22.00787Zm0-23.69539V297.89694h49.6139v22.00828Zm0-23.6958V274.20114h49.6139v22.00828Zm0-23.6958V250.50575h49.6139v22.00787Zm-1.68752,0H762.906V250.50575H812.519Zm-51.3006,0H660.30472V250.50575H761.21839Zm-102.60119,0H609.00418V250.50575h49.61307Zm-51.3006,0H557.7027V250.50575h49.6139Zm0,1.68752v22.00828H557.7027V274.20114Zm-51.30142,22.00828H506.40216V274.20114h49.61307Zm0,1.68752v22.00828H506.40216V297.89694Zm0,23.6958v22.00787H506.40216V321.59274Zm0,23.69539v22.00828H506.40216V345.28813Zm0,23.6958v22.00828H506.40216V368.98393Zm0,23.69581V414.6876H506.40216V392.67974Zm0,23.69539V438.3834H506.40216V416.37513Zm0,23.6958v22.00786H506.40216V440.07093Zm1.68752,0h49.6139v22.00786H557.7027Zm49.6139,23.69539V485.775H557.7027V463.76632Zm1.68753,0h49.61307V485.775H609.00418Zm51.30059,0H761.21839V485.775H660.30472Zm102.6012,0H812.519V485.775H762.906Zm51.30059,0h49.6139V485.775h-49.614Zm0-1.68753V440.07093h49.6139v22.00786ZM865.508,440.07093h49.61308v22.00786H865.508Zm0-1.68753V416.37513h49.61308V438.3834Zm0-23.6958V392.67974h49.61308V414.6876Zm0-23.69539V368.98393h49.61308v22.00828Zm0-23.6958V345.28813h49.61308v22.00828Zm0-23.6958V321.59274h49.61308v22.00787Zm0-23.69539V297.89694h49.61308v22.00828Zm0-23.6958V274.20114h49.61308v22.00828Zm0-23.6958V250.50575h49.61308v22.00787Zm0-23.69539V226.81h49.61308v22.00828Zm-1.68752,0h-49.614V226.81h49.6139Zm-51.30142,0H762.906V226.81H812.519Zm-51.3006,0H660.30472V226.81H761.21839Zm-102.60119,0H609.00418V226.81h49.61307Zm-51.3006,0H557.7027V226.81h49.6139Zm-51.30142,0H506.40216V226.81h49.61307Zm0,1.68752v22.00787H506.40216V250.50575Zm-51.3006,22.00787H455.10156V250.50575h49.61307Zm0,1.68752v22.00828H455.10156V274.20114Zm0,23.6958v22.00828H455.10156V297.89694Zm0,23.6958v22.00787H455.10156V321.59274Zm0,23.69539v22.00828H455.10156V345.28813Zm0,23.6958v22.00828H455.10156V368.98393Zm0,23.69581V414.6876H455.10156V392.67974Zm0,23.69539V438.3834H455.10156V416.37513Zm0,23.6958v22.00786H455.10156V440.07093Zm0,23.69539V485.775H455.10156V463.76632Zm1.68753,0h49.61307V485.775H506.40216Zm49.61307,23.69621V509.4704H506.40216V487.46253Zm1.68752,0h49.6139V509.4704H557.7027Zm51.30143,0h49.61307V509.4704H609.00418Zm51.30059,0H761.21839V509.4704H660.30472Zm102.6012,0H812.519V509.4704H762.906Zm51.30059,0h49.6139V509.4704h-49.614Zm51.30142,0h49.61308V509.4704H865.508Zm0-1.68752V463.76632h49.61308V485.775Zm51.3006-22.00869h49.61307V485.775H916.80858Zm0-1.68753V440.07093h49.61307v22.00786Zm0-23.69539V416.37513h49.61307V438.3834Zm0-23.6958V392.67974h49.61307V414.6876Zm0-23.69539V368.98393h49.61307v22.00828Zm0-23.6958V345.28813h49.61307v22.00828Zm0-23.6958V321.59274h49.61307v22.00787Zm0-23.69539V297.89694h49.61307v22.00828Zm0-23.6958V274.20114h49.61307v22.00828Zm0-23.6958V250.50575h49.61307v22.00787ZM504.71463,226.81v22.00828H455.10156V226.81ZM455.10156,487.46253h49.61307V509.4704H455.10156Zm461.707,22.00787V487.46253h49.61307V509.4704Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#e6e6e6"
      />
      <path
        d="M313.30622,380.10373s-26.03815-6-40.35914,5,18.22671,36,18.22671,36Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#2f2e41"
      />
      <path
        d="M340.23334,523.58686a10.05578,10.05578,0,0,1,7.53982-13.45016l5.26214-35.34529,13.828,12.3944-7.117,31.66428a10.11028,10.11028,0,0,1-19.51294,4.73677Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#ffb8b8"
      />
      <polygon
        points="68.648 525.464 80.881 524.652 83.571 477.082 65.517 478.28 68.648 525.464"
        fill="#ffb8b8"
      />
      <path
        d="M283.32582,702.4627h38.53072a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H298.21268a14.88686,14.88686,0,0,1-14.88686-14.88686v0A0,0,0,0,1,283.32582,702.4627Z"
        transform="translate(388.102 1238.20061) rotate(180)"
        fill="#2f2e41"
      />
      <polygon
        points="89.789 508.53 101.29 512.775 123.139 470.433 106.164 464.168 89.789 508.53"
        fill="#ffb8b8"
      />
      <path
        d="M301.84846,692.15621h38.53072a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H316.73532a14.88686,14.88686,0,0,1-14.88686-14.88686v0A0,0,0,0,1,301.84846,692.15621Z"
        transform="translate(163.01524 1285.50014) rotate(-159.73947)"
        fill="#2f2e41"
      />
      <path
        d="M340.3112,507.39106s12.3886,6.67078,8.57672,33.35393L345.076,641.75975l-21.05939,46.04944-18.10642-4.76485,11.5297-37.47271-15.24751-65.75489-2,119.42808L283.039,702.10373,258.35582,503.57918l31.448-14.29454Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#2f2e41"
      />
      <circle cx="78.95026" cy="162.59444" r="24.56103" fill="#ffb8b8" />
      <path
        d="M310.29266,375.40479l-12.3886,20.01236-18.10642-18.10642-33.84971,23.69479a6.40259,6.40259,0,0,0-2.27327,7.64346c5.20684,12.87513,18.54057,50.93294,14.68116,94.9302,0,0,25.73018-6.67079,52.41332.953s33.35393,4.76485,33.35393,4.76485-6.67078-48.60145-2.8589-59.08411c3.1619-8.69524,9.60226-37.71688,11.70665-47.36117a4.34654,4.34654,0,0,0-2.12719-4.72057Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#6c63ff"
      />
      <path
        d="M349.86194,398.24706l0,0a4.35486,4.35486,0,0,1,4.81278,3.14888l16.13149,58.25259-3.81188,35.25987-18.10642-2.8589,1.90594-24.77721-13.34157-31.448,8.80712-34.34778A4.35486,4.35486,0,0,1,349.86194,398.24706Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#6c63ff"
      />
      <path
        d="M277.03832,309.7283a17.506,17.506,0,0,1,16.14123-8.58806,34.30591,34.30591,0,0,1,9.7548,2.73058l16.05606,6.26317c4.15471,1.62067,8.705,3.60587,10.50786,7.68482,1.67331,3.78583.42489,8.15807-.83887,12.09956L322.65222,348.654a57.03087,57.03087,0,0,0-3.40415-12.37628c-1.74494-3.9173-4.50473-7.52937-8.3203-9.48677-4.17057-2.13951-9.08622-2.09521-13.76814-1.86989-6.63082.31911-13.8404,1.16273-18.55166,5.83967a19.26957,19.26957,0,0,0-4.88945,9.54931,57.47859,57.47859,0,0,0-1.02534,10.8092,89.61293,89.61293,0,0,1-6.84346-14.67147,36.3,36.3,0,0,1-2.54269-11.876,16.70268,16.70268,0,0,1,3.82833-11.29616c2.71259-3.03167,7.13245-4.66839,11.01942-3.46817"
        transform="translate(-217.08037 -181.61165)"
        fill="#2f2e41"
      />
      <path
        d="M263.3791,537.58686a10.05578,10.05578,0,0,0-7.53982-13.45016l-5.26214-35.34529-13.828,12.3944,7.117,31.66428a10.11028,10.11028,0,0,0,19.51294,4.73677Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#ffb8b8"
      />
      <path
        d="M246.29533,400.66856h0a6.4131,6.4131,0,0,0-5.35079,6.00558l-5.46,109.19958h20.01235l6.67079-58.13113-8.48945-51.78568A6.41309,6.41309,0,0,0,246.29533,400.66856Z"
        transform="translate(-217.08037 -181.61165)"
        fill="#6c63ff"
      />
      <polygon
        points="171.738 536.777 0 536.777 0 534.671 172.12 534.671 171.738 536.777"
        fill="#ccc"
      />
    </svg>
  );
};

const renderSvg = () => {
  return (
    <svg
      id="b2448b99-d97f-419e-8dc3-d5510f0392fe"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width="709.53268"
      height="558.59384"
      viewBox="0 0 709.53268 558.59384"
    >
      <rect
        x="0.27492"
        y="0.36501"
        width="643.86162"
        height="412.35762"
        fill="#e6e6e6"
      />
      <rect
        x="18.68599"
        y="52.08494"
        width="607.03947"
        height="336.24257"
        fill="#fff"
      />
      <rect width="643.86163" height="27.3536" fill="#6c63ff" />
      <circle cx="20.327" cy="13.98461" r="5.06978" fill="#fff" />
      <circle cx="39.57061" cy="13.98461" r="5.06978" fill="#fff" />
      <circle cx="58.81422" cy="13.98461" r="5.06978" fill="#fff" />
      <rect
        x="73.84385"
        y="86.97284"
        width="155.98055"
        height="266.46677"
        fill="#e6e6e6"
      />
      <rect
        x="256.7496"
        y="86.97284"
        width="129.9838"
        height="73.34799"
        fill="#6c63ff"
      />
      <rect
        x="256.7496"
        y="180.74686"
        width="129.9838"
        height="78.91873"
        fill="#e6e6e6"
      />
      <rect
        x="256.7496"
        y="280.09161"
        width="129.9838"
        height="73.34799"
        fill="#e6e6e6"
      />
      <rect
        x="414.58707"
        y="86.97284"
        width="155.98056"
        height="116.12476"
        fill="#e6e6e6"
      />
      <rect
        x="414.58707"
        y="237.31485"
        width="155.98056"
        height="116.12476"
        fill="#e6e6e6"
      />
      <path
        d="M755.71223,382.14309v-25a33.5,33.5,0,1,1,67,0v25a4.50508,4.50508,0,0,1-4.5,4.5h-58A4.50508,4.50508,0,0,1,755.71223,382.14309Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <polygon
        points="593.514 536.786 581.698 540.056 563.462 496.038 580.901 491.212 593.514 536.786"
        fill="#ffb8b8"
      />
      <path
        d="M819.38459,708.28158h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H804.49773a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,819.38459,708.28158Z"
        transform="translate(-406.29299 74.94457) rotate(-15.46951)"
        fill="#2f2e41"
      />
      <polygon
        points="470.328 545.875 458.068 545.875 452.235 498.587 470.33 498.587 470.328 545.875"
        fill="#ffb8b8"
      />
      <path
        d="M449.31065,542.37161h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H434.42379a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,449.31065,542.37161Z"
        fill="#2f2e41"
      />
      <path
        d="M700.77825,452.301a10.0558,10.0558,0,0,0,15.392.91737l32.59018,14.65807L745.796,449.54488l-30.4937-11.10914a10.11028,10.11028,0,0,0-14.524,13.86524Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#ffb8b8"
      />
      <path
        d="M768.49246,562.53911c-10.23925,0-20.83911-1.52539-29.74878-6.06152a38.41551,38.41551,0,0,1-19.70874-23.56543c-4.64233-14.69922,1.21094-29.14014,6.87134-43.105,3.50757-8.65381,6.82056-16.82715,7.68018-24.88379l.30029-2.86036c1.33887-12.84765,2.49512-23.94335,8.897-28.105,3.31836-2.15722,7.77979-2.28027,13.64063-.377l55.04492,17.88135-2.02393,104.49023-.33447.11182C808.82279,556.16118,789.41824,562.53911,768.49246,562.53911Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <path
        d="M755.46218,401.05127s27-8,48-5c0,0-12,66-8,88s-69.5,8.5-54.5-12.5l5-25s-10-10-1-22Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#6c63ff"
      />
      <path
        d="M742.18192,560.55815l-33.27637-6.23926,11.61768-89.40673c.78125-2.4961,18.77807-59.14307,26.95166-62.208a139.51716,139.51716,0,0,1,18.16626-5.04688l1.18383-.23681-6.67236,10.00879-26.56445,63.65429Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <path
        d="M724.84329,705.62163l-42.99487-7.16553,24.12817-98.52392,35.90332-134.73731.35425,2.39258c.02808.17822,3.38208,17.77978,53.15064,9.96973l.43774-.06836.12085.42627,60.1521,212.53759-48.99048,8.165L762.42215,543.55083Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <path
        d="M784.43558,577.2896l.02685-.75635c.03-.83984,2.988-84.37256,2-117.96729-.99145-33.709,9.92188-62.90087,10.03223-63.19189l.08887-.23438.24121-.06933c14.11963-4.03369,26.3689,8.00537,26.491,8.12744l.17211.17188-4.02124,33.17626,17.21607,120.64161Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <circle cx="537.09466" cy="190.79701" r="24.56103" fill="#ffb8b8" />
      <path
        d="M747.78694,359.14309a26.53,26.53,0,0,1,26.5-26.5h5.00024a26.52977,26.52977,0,0,1,26.49976,26.5v.5H795.22029l-3.604-10.09179-.7207,10.09179h-5.46094l-1.81836-5.09179-.36377,5.09179H747.78694Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <path
        d="M779.91118,389.45438a4.43341,4.43341,0,0,1-.3523-4.707c5.29859-10.07813,12.71729-28.7002,2.87012-40.18457l-.70776-.8252h28.5874V386.6575l-25.96948,4.582a4.59632,4.59632,0,0,1-.79639.07032A4.48193,4.48193,0,0,1,779.91118,389.45438Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <path
        d="M664.81368,212.24945a135.01972,135.01972,0,1,0,7.65509,199.4028L838.08687,551.4a12.44209,12.44209,0,0,0,16.06592-19.00287l-.01831-.01544L688.51631,392.63391A135.02729,135.02729,0,0,0,664.81368,212.24945ZM654.13692,379.17712a101.15765,101.15765,0,1,1-12.0766-142.54788l.00006,0A101.15764,101.15764,0,0,1,654.13692,379.17712Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#3f3d56"
      />
      <path
        d="M511.589,391.25375a101.16315,101.16315,0,0,1-17.16559-135.989q-2.90121,2.92177-5.60938,6.1199A101.15767,101.15767,0,1,0,643.43849,391.85605q2.702-3.20224,5.089-6.559A101.163,101.163,0,0,1,511.589,391.25375Z"
        transform="translate(-245.23366 -170.70308)"
        opacity="0.3"
      />
      <path
        d="M790.214,495.239a10.05578,10.05578,0,0,0,12.42386-9.13254l34.433-9.55748L823.074,464.34553l-30.55233,10.94686A10.11027,10.11027,0,0,0,790.214,495.239Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#ffb8b8"
      />
      <path
        d="M804.52567,490.18022,802.43021,470.274l28.76245-15.86914-18.75244-22.70019L815.5,406.20512l7.61987-3.26562.23707.30469c3.593,4.62011,35.10522,45.28076,35.10522,50.30713,0,5.16259-6.02856,20.32324-14.27637,24.44726-7.95581,3.978-37.83081,11.70947-39.09863,12.03711Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#2f2e41"
      />
      <path
        d="M953.76634,729.29692h-381a1,1,0,1,1,0-2h381a1,1,0,0,1,0,2Z"
        transform="translate(-245.23366 -170.70308)"
        fill="#ccc"
      />
    </svg>
  );
};
